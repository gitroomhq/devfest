import moment from 'moment';
import { graphql } from '@octokit/graphql';
import { getOwnerAndName } from '@backend/runners/queues/score.queue';

const runQuery = async (query: string, token: string): Promise<any> => {
  try {
    const data = await graphql(query, {
      request: {
        fetch,
      },
      headers: {
        authorization: `token ${token}`,
      },
    });

    return { data };
  } catch (err) {
    const data = await graphql(query, {
      request: {
        fetch,
      },
      headers: {
        authorization: `Basic ${process.env.GITHUB_AUTH}`,
      },
    });

    return { data };
  }
};

const year = moment().format('YYYY');

interface PullsById {
  data: {
    nodes: Array<{
      id: string;
      createdAt: string;
      title: string;
      url: string;
    }>;
  };
}

interface GraphQLResponse {
  data: {
    rateLimit: {
      remaining: number;
    };
    search: {
      issueCount: number;
      edges: Array<{
        cursor: string;
        node: {
          id: string;
          createdAt: string;
          title: string;
          url: string;
        };
      }>;
    };
  };
}

export class GithubService {
  static async loadPrDetails(ids: string[], token: string): Promise<PullsById> {
    try {
      const { data }: { data: PullsById } = await runQuery(
        `
query {
  nodes(ids: ${JSON.stringify(ids)}) {
    ... on PullRequest {
        id
        createdAt
        title
        url
    }
  }
}
            `,
        token
      );

      return data;
    } catch (err) {
      return {
        data: {
          nodes: [],
        },
      };
    }
  }

  static async loadUserPRs(
    name: string,
    token: string,
    after = ''
  ): Promise<{
    total: number;
    issues: Array<{
      id: string;
      createdAt: string;
      title: string;
      url: string;
    }>;
  }> {
    console.log('Calculating ' + name);
    if (after) {
      console.log('getting after');
    }
    try {
      const data: GraphQLResponse = await runQuery(
        `
{
    rateLimit{
      remaining
    }
    search (
        first: 100
        type: ISSUE
        ${after ? `after: "${after}"` : ''}
        query: "-label:spam,invalid is:closed author:${name} is:pr sort:created-desc merged:${year}-10-01..${year}-10-31T23:59:00"
    ) {
        issueCount
        edges {
            cursor
            node {
                ... on PullRequest {
                    id
                    createdAt
                    title
                    url
                }
            }
        }
    }
}
            `,
        token
      );

      return {
        total: data.data.search.issueCount || 0,
        issues: [
          ...data?.data?.search?.edges.map((p) => p.node),
          ...((data?.data?.search?.edges?.length || 0) < 100
            ? []
            : (
                await this.loadUserPRs(
                  name,
                  token,
                  data.data.search.edges[data.data.search.edges.length - 1]
                    .cursor
                )
              ).issues),
        ],
      };
    } catch (err) {
      console.log(`There was a problem getting ${name}`);
      return { total: 0, issues: [] };
    }
  }

  static async totalRepositoryStars(
    name: string,
    token: string
  ): Promise<number> {
    try {
      const props = getOwnerAndName(name);
      const { data }: { data: any } = await runQuery(
        `
                    {
                      repository(owner:"${props.owner}", name:"${props.name}") {
                        stargazers {
                          totalCount
                        }
                      }
                    }
                    `,
        token
      );
      return data.repository.stargazers.totalCount;
    } catch (err) {
      console.log('err', name.startsWith('/') ? name.slice(1) : name);
      return 0;
    }
  }
}

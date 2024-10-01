import { QueueInterface } from '../runners.interface';
import { prisma } from '@db/prisma';
import { GithubService } from '@backend/services/github/github.service';
import { uniq, uniqBy } from 'lodash';

export const getOnlyRepo = (url: string) => {
  const urlWithoutGithub = url
    .replace('https://github.com/', '')
    .replace('https://github.com', '');
  const firstSlash = urlWithoutGithub.startsWith('/')
    ? urlWithoutGithub.slice(1)
    : urlWithoutGithub;
  const [owner, name] = firstSlash.split('/');
  return `${owner.toLowerCase()}/${name.toLowerCase()}`;
};

export const getOwnerAndName = (url: string) => {
  const urlWithoutGithub = url
    .replace('https://github.com/', '')
    .replace('https://github.com', '');
  const firstSlash = urlWithoutGithub.startsWith('/')
    ? urlWithoutGithub.slice(1)
    : urlWithoutGithub;
  const [owner, name] = firstSlash.split('/');
  return { owner: owner.toLowerCase(), name: name.toLowerCase() };
};

export class ScoreQueue implements QueueInterface<string> {
  name() {
    return 'Scores';
  }

  numWorkers() {
    return 5;
  }

  async handle(arg: string) {
    const { id } = JSON.parse(arg);
    const getAllTeamMembers = await prisma.squad.findUnique({
      where: {
        id,
      },
      select: {
        members: {
          select: {
            handle: true,
            id: true,
            accounts: {
              select: {
                access_token: true,
              },
            },
          },
        },
      },
    });

    let squadScore = 0;
    for (const member of getAllTeamMembers.members) {
      const memberPrs = await GithubService.loadUserPRs(
        member.handle,
        member.accounts[0].access_token
      );

      const allRepos = await Promise.all(
        uniqBy(memberPrs.issues, (p) => p.url).map(async (p) => {
          return {
            issue: p,
            stars:
              (await GithubService.totalRepositoryStars(
                'https://github.com/' + getOnlyRepo(p.url),
                member?.accounts?.[0]?.access_token || ''
              )) > 200,
          };
        })
      );

      const filterIssues = allRepos.filter((p) => p.stars).map((p) => p.issue);
      const onlyRepos = uniq(filterIssues.map((p) => getOnlyRepo(p.url)));

      for (const repo of onlyRepos) {
        try {
          // insert missing errors for approval
          await prisma.repositories.create({
            data: {
              nameOwner: repo,
              allowed: false,
            },
          });
        } catch (err) {
          /* empty */
        }
      }

      // get all the repos + missing ones
      const findAllRepos = await prisma.repositories.findMany({
        where: {
          nameOwner: {
            in: onlyRepos,
          },
        },
      });

      const onlyUrl = filterIssues.map((p) => p.url.toLowerCase());
      const onlyRepo = findAllRepos.filter(f => !f.allowed).map((p) => p.nameOwner.toLowerCase());

      const removeNonApprovedRepositories = onlyUrl.filter((p) => {
        return onlyRepo.some((r) => !p.includes(r));
      });

      const score = await prisma.bonuses.findMany({
        where: {
          userId: member.id,
        },
      });

      const sum = score.reduce((acc, curr) => acc + curr.score, 0);
      const memberScore = sum + removeNonApprovedRepositories.length;

      await prisma.user.update({
        where: {
          id: member.id,
        },
        data: {
          score: memberScore,
        },
      });

      squadScore += memberScore;
    }

    await prisma.squad.update({
      where: {
        id,
      },
      data: {
        score: squadScore,
      },
    });
  }
}

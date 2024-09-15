import { handleSlugs } from '@frontend/queries/handle.slugs';
import { uniq } from 'lodash';
import { getUser } from '@frontend/queries/get.user';
import { Wrapper } from '@frontend/components/layout/wrapper';
import { Ticket } from '@frontend/sections';
import Head from 'next/head';
import Seo from '@frontend/components/seo/seo';

const Tickets = (props: {
  user: {
    id: string;
    color: number;
    name: string;
    handle: string;
    numericId: string;
  };
}) => {
  return (
    <>
      <Seo
        img={'https://devfest.ai/api/og/' + props.user.handle}
        title={`${props.user.name}'s Ticket`}
        description="Showcase your unique ticket on X to all your friends! By the end of the competition we will do a big giveaway for all the shares. Make sure you tag us on social media so we can find your ticket."
      />
      <Wrapper>
        <Ticket user={props.user} hideCTA={true} />
      </Wrapper>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: {
  params: { handle: string };
}) => {
  const user = await getUser(context.params.handle);
  if (!user) {
    return {
      props: {
        redirect: '/404',
      },
    };
  }
  return {
    props: {
      user,
    },
  };
};

export default Tickets;

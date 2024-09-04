import { Wrapper } from "@frontend/components/layout/wrapper";
import { getSquadById } from "@frontend/queries/get.squad.by.id";
import { Squad, SquadProps } from "@frontend/components/squads/squad";
import Seo from "@frontend/components/seo/seo";
export default function Squads(props: { squad: SquadProps }) {
  return (
    <>
      <Seo
        title={`${props.squad.name} Squad`}
        description={`HackFest 2024 ${props.squad.name} Squad Page`}
      />
      <Wrapper>
        <Squad {...props} />
      </Wrapper>
    </>
  );
}
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: {
  params: { squad: string };
}) => {
  const squad = await getSquadById(context.params.squad);
  if (!squad) {
    return {
      props: {
        redirect: "/404",
      },
    };
  }
  return {
    props: {
      squad,
    },
  };
};

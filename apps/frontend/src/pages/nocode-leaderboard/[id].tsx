import { Wrapper } from '@frontend/components/layout/wrapper';
import Seo from '@frontend/components/seo/seo';
import { getUserById } from '@frontend/queries/get.user.by.id';
import dynamic from 'next/dynamic';
const CheckEligibility = dynamic(
  () => import('@frontend/components/nocode-competition/checkEligibility'),
  {
    ssr: false,
  }
);

export interface UserProps {
  id: string;
  noCodeScore: number;
  name: string;
  handle: string;
}
export default function Squads(props: { user: UserProps }) {
  return (
    <>
      <Seo
        title={`${props.user.name}`}
        description={`DevFest 2024 ${props.user.handle} Page`}
      />
      <Wrapper>
        <div className="flex flex-col">
          <h1 className="text-center font-inter mx-auto font-semibold text-[100px] md:text-[50px] xs:max-w-[246px]">
            Welcome to {props.user.name}
            {"'"}s Page
          </h1>

          <div className="text-center text-[20px]">
            Help ${props.user.name} to win awesome swag by starring and forking repos on
            GitHub.
          </div>

          <div className="text-center mt-[30px]">
            <CheckEligibility id={props.user.id} />
          </div>
        </div>
      </Wrapper>
    </>
  );
}
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: {
  params: {
    id: string;
  };
}) => {
  const user = await getUserById(context.params.id);
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
    revalidate: 1800,
  };
};

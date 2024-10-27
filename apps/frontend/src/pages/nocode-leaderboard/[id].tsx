import { Wrapper } from '@frontend/components/layout/wrapper';
import Seo from '@frontend/components/seo/seo';
import { getUserById } from '@frontend/queries/get.user.by.id';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import GithubSvg from '@frontend/components/svgs/GithubSvg';
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
  toUserBonus: {
    bonusFrom: {
      id: string;
      name: string;
      handle: string;
    };
  }[];
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
            Help {props.user.name} to win awesome swag by starring and forking
            repos on GitHub.
          </div>

          <div className="text-center mt-[30px]">
            <CheckEligibility id={props.user.id} />
          </div>
        </div>

        <div className="mt-[50px]">
          <div className="flex flex-col w-full max-w-[800px] mx-auto gap-2.5">
            <div className="grid grid-cols-[100px,200px,300px] rounded-[12px] bg-chatGrad h-[72px] px-[32px]">
              <div className="text-left flex items-center">PLACE</div>
              <div className="flex items-center">NAME</div>
              <div className="flex items-center">GITHUB</div>
            </div>
            {props.user.toUserBonus.map((p, index) => (
              <div
                key={p.bonusFrom.id}
                className="cursor-pointer grid grid-cols-[100px,200px,300px] bg-[#191919] hover:bg-[#333333] rounded-[12px] h-[72px] px-[32px]"
                onClick={() =>
                  window.open(`https://github.com/${p.bonusFrom.handle}`)
                }
              >
                <div className="text-left flex items-center">{index + 1}</div>
                <div className="flex items-center">
                  <Link href={`https://github.com/${p.bonusFrom.handle}`}>
                    {p.bonusFrom.name}
                  </Link>
                </div>
                <div className="flex items-center gap-[20px]">
                  <GithubSvg color="white" />
                  {p.bonusFrom.handle}
                </div>
              </div>
            ))}
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
  console.log(JSON.stringify(user, null, 2));
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

import { Wrapper } from '@frontend/components/layout/wrapper';
import Seo from '@frontend/components/seo/seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getLeaderBoardNoCode } from '@frontend/queries/nocode-leaderboard';

export default function Index(props: {
  leaderBoard: { id: string; name: string; noCodeScore: number }[];
}) {
  const { leaderBoard } = props;
  const router = useRouter();
  return (
    <Wrapper>
      <Seo
        title="Leaderboard"
        description="Contribute code, rank on the leaderboard and win awesome SWAG."
      />
      <h1 className="mb-10 leading-[100px] text-center font-inter mx-auto max-w-2xl font-semibold text-[100px] md:text-42 xs:max-w-[246px]">
        No-Code Leaderboard
      </h1>

      <div>
        <div className="flex flex-col w-full max-w-[800px] mx-auto gap-2.5">
          <div className="grid grid-cols-[100px,1fr,100px] rounded-[12px] bg-chatGrad h-[72px] px-[32px]">
            <div className="text-left flex items-center">PLACE</div>
            <div className="flex items-center">NAME</div>
            <div className="flex items-center">SCORE</div>
          </div>
          {leaderBoard.map((p, index) => (
            <div
              onClick={() => router.push(`/nocode-leaderboard/${p.id}`)}
              key={p.id}
              className="cursor-pointer grid grid-cols-[100px,1fr,100px] bg-[#191919] hover:bg-[#333333] rounded-[12px] h-[72px] px-[32px]"
            >
              <div className="text-left flex items-center">{index + 1}</div>
              <div className="flex items-center">
                <Link href={`/nocode-leaderboard/${p.id}`}>{p.name}</Link>
              </div>
              <div className="flex items-center">{p.noCodeScore}</div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const leaderBoard = await getLeaderBoardNoCode();
  return {
    props: {
      leaderBoard: leaderBoard.slice(500),
    },
    revalidate: 120,
  };
};

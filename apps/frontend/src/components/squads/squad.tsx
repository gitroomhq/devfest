import { FC } from "react";
import GithubSvg from "@frontend/components/svgs/GithubSvg";
import Link from "next/link";
import { sumBy } from "lodash";

export interface SquadProps {
  id: string;
  score: number;
  name: string;
  members: {
    id: string;
    name: string;
    handle: string;
    image: string;
    score: number;
    prs: string;
    bonuses: {
      id: string;
      score: number;
    }[];
  }[];
}
export const Squad: FC<{ squad: SquadProps }> = (props) => {
  return (
    <div className="flex flex-col">
      <h1 className="mb-10 text-center font-inter mx-auto font-semibold text-[100px] md:text-42 xs:max-w-[246px]">
        {props.squad.name}
      </h1>

      <div>
        <div className="flex flex-col w-full max-w-[800px] mx-auto gap-2.5">
          <div className="grid grid-cols-[30px,1fr,180px] rounded-[12px] bg-chatGrad h-[72px] px-[32px]">
            <div className="text-left flex items-center">#</div>
            <div className="flex items-center">NAME</div>
            <div className="flex items-center">SCORE</div>
          </div>
          {props.squad.members.map((p, index) => (
            <div
              key={p.id}
              className="grid grid-cols-[30px,1fr,180px] bg-[#191919] rounded-[12px] h-[72px] px-[32px]"
            >
              <div className="text-left flex items-center">{index + 1}</div>
              <div className="flex items-center gap-[10px]">
                <Link href={`https://github.com/${p.handle}`} target="_blank">
                  {p.name}
                </Link>
                <div>
                  <Link href={`https://github.com/${p.handle}`} target="_blank">
                    <GithubSvg color="white" width={16} height={16} />
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                {p.score}
                {!!p.bonuses.length && ` (+${sumBy(p.bonuses, (p) => p.score)} bonuses)`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { FC } from 'react';
import GithubSvg from '@frontend/components/svgs/GithubSvg';
import Link from 'next/link';
import { sumBy } from 'lodash';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const RemoveFromSquad = dynamic(
  () => import('@frontend/components/mods/remove.from.squad'),
  {
    ssr: false,
  }
);
const Ban = dynamic(() => import('@frontend/components/mods/ban'), {
  ssr: false,
});
export interface SquadProps {
  id: string;
  score: number;
  name: string;
  members: {
    id: string;
    banned: boolean;
    name: string;
    handle: string;
    image: string;
    score: number;
    bonus: number;
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
          <div className="grid grid-cols-[30px,70px,1fr,120px] rounded-[12px] bg-chatGrad h-[72px] px-[32px]">
            <div className="text-left flex items-center">#</div>
            <div className="flex items-center"></div>
            <div className="flex items-center">NAME</div>
            <div className="flex items-center">SCORE</div>
          </div>
          {props.squad.members.map((p, index) => (
            <div
              key={p.id}
              className="grid grid-cols-[30px,70px,1fr,120px] bg-[#191919] rounded-[12px] h-[72px] px-[32px]"
            >
              <div className="text-left flex items-center">{index + 1}</div>
              <div className="text-left flex items-center">
                <Image
                  width={50}
                  height={50}
                  src={p.image}
                  alt={p.name}
                  className="rounded-full"
                />
              </div>
              <div className="flex items-center gap-[10px]">
                <Link
                  href={`https://github.com/${p.handle}`}
                  target="_blank"
                  className="flex flex-col"
                >
                  <div>{p.name}</div>
                  {p.banned && <div className="text-red-500">Banned</div>}
                </Link>
                <Link
                  className="flex flex-1"
                  href={`https://github.com/${p.handle}`}
                  target="_blank"
                >
                  <GithubSvg color="white" width={16} height={16} />{' '}
                </Link>
                <div className="flex gap-[10px] mr-[20px]">
                  {!p.banned && <RemoveFromSquad id={p.id} />}
                  <Ban id={p.id} banned={p.banned} />
                </div>
              </div>
              <div className="flex items-center">
                {p.score - p.bonus}
                {!!p.bonus && ` (+${p.bonus} bonuses)`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

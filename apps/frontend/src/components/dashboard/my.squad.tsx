'use client';

import { Button } from '@frontend/components/button';
import { FC, useState } from 'react';
import { Chat } from '@frontend/components/dashboard/chat';
import { TeamDetails } from '@frontend/components/dashboard/team.details';
import { User } from '@frontend/components/dashboard/main';
import { Members } from '@frontend/components/dashboard/members';
import { JoinUs } from '@frontend/components/dashboard/join.us';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export const MySquad: FC<{
  user: User;
  mutate: () => void;
}> = (props) => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {showDetails && (
        <TeamDetails
          user={props.user}
          mutate={props.mutate}
          close={() => setShowDetails(false)}
        />
      )}
      <div
        className={clsx(
          'transition-all flex flex-col gap-[12px]',
          showDetails && 'blur-[25px]'
        )}
      >
        <div className="flex flex-1 flex-col gap-[12px]">
          <div className="h-[432px] w-full relative pt-[20px] pl-[40px] pr-[20px]">
            <img
              className="absolute z-[0] pointer-events-none left-0 top-0 w-full h-full object-cover border border-[#4c417e]/80 rounded-[15px]"
              src="/home-pub.png"
            />
            <div className="flex justify-end w-full relative z-10">
              <div className="bg-score pt-[14px] px-[40px] pb-[14px] rounded-[12px] text-[40px]">
                Score: {props.user.squad.score}
              </div>
            </div>

            <div className="mt-[10px] flex flex-col relative z-10 gap-[24px]">
              <div className="capitalize text-[16px] text-white/70">
                [ my squad ]
              </div>
              <div className="flex items-end gap-[10px]">
                <div className="capitalize text-[110px] font-bebas leading-[100px]">
                  {props.user.squad.name}
                </div>
              </div>
              <div className="flex gap-[12px]">
                <CopyToClipboard
                  text={'https://devfest.ai/invite/' + props.user.squad.id}
                  onCopy={() => {
                    toast.success('Copied to clipboard', {
                      icon: '👏',
                    });
                  }}
                >
                  <Button
                    className="wrapinv w-[360px]"
                    variant="secondary"
                    glow={false}
                  >
                    <div className="inv" />{' '}
                  </Button>
                </CopyToClipboard>

                {props.user.owner && (
                  <Button
                    glow={false}
                    variant="secondary"
                    onClick={() => setShowDetails(true)}
                  >
                    Squad Settings
                  </Button>
                )}

                <Button
                  className="animate-bounce"
                  glow={false}
                  onClick={() => router.push('/dashboard/bonuses')}
                >
                  Bonuses
                </Button>
                <Button
                  className="animate-bounce"
                  glow={false}
                  onClick={() => router.push('/nocode-leaderboard/' + props.user.id)}
                >
                  [NEW] No-code competition
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[12px]">
          <div className="flex flex-1 flex-col gap-[12px]">
            <div className="bg-[#191919] p-[40px] rounded-[16px] flex flex-col gap-[40px]">
              <div className="capitalize text-[16px] text-white/70">
                [ {props.user.squad.members.length} / 5 participants ]
              </div>
              <div className="flex gap-[32px]">
                <Members user={props.user} />
              </div>
            </div>
            <div className="bg-[#191919] p-[40px] rounded-[16px] flex flex-col gap-[40px]">
              <JoinUs />
            </div>
          </div>
          <div className="w-[445px] min-h-full">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};

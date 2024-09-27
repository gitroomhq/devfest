'use client';

import { Button } from '@frontend/components/button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { starsBonus } from '@frontend/utils/stars.bonus';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import GithubSvg from '@frontend/components/svgs/GithubSvg';
import { capitalize } from 'lodash';

export function Bonuses() {
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const bonuses = useCallback(async () => {
    return (await fetch(`/api/dashboard/bonus`)).json();
  }, []);

  const { data, isLoading, mutate } = useSWR('bonuses', bonuses);

  const bonusStar = useCallback(
    (repository: string, type: string) => async () => {
      setLoading(true);
      const star = await (
        await fetch(`/api/dashboard/bonus/${type}`, {
          method: 'POST',
          body: JSON.stringify({
            repository,
          }),
        })
      ).json();

      if (!star.success) {
        toast.error(`You need to ${type} the repository first`, {
          icon: '🌟',
        });

        setLoading(false);
        return;
      }

      toast.success('Claimed', {
        icon: '🌟',
      });

      await mutate();
      setLoading(false);
    },
    [mutate]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-inter mx-auto font-semibold text-[100px] md:text-42 xs:max-w-[246px]">
        Bonuses 🎁
      </h1>

      <div>
        <div className="flex flex-col w-full max-w-[1000px] mx-auto gap-2.5">
          <div className="grid grid-cols-[30px,1fr,180px,180px] rounded-[12px] bg-chatGrad h-[72px] px-[32px]">
            <div className="text-left flex items-center">#</div>
            <div className="flex items-center">TYPE</div>
            <div className="flex items-center">POINTS</div>
            <div className="flex items-center">CLAIM</div>
          </div>
          <div className="grid grid-cols-[30px,1fr,180px,180px] bg-[#191919] rounded-[12px] h-[72px] px-[32px]">
            <div className="text-left flex items-center">1</div>
            <div className="flex items-center">
              Invite a friend to DevFest AI
            </div>
            <div className="flex items-center">1 per friend [Max:5]</div>
            <div className="flex items-center">
              <CopyToClipboard
                text={`https://devfest.ai/friend/${session?.data?.user?.id}`}
                onCopy={() => {
                  toast.success('Copied to clipboard', {
                    icon: '👏',
                  });
                }}
              >
                <Button size="sm">Copy Invite Link</Button>
              </CopyToClipboard>
            </div>
          </div>
          {['star', 'fork'].flatMap((p, indexTop) => starsBonus.flatMap((bonus, index) => (
            <div
              key={`${p}_${index}`}
              className="grid grid-cols-[30px,1fr,180px,180px] bg-[#191919] rounded-[12px] h-[72px] px-[32px]"
            >
              <div className="text-left flex items-center">{(starsBonus.length * indexTop) + index + 1}</div>
              <div
                className="text-left flex items-center cursor-pointer gap-[10px]"
                onClick={() =>
                  window.open(
                    `https://github.com/${bonus}`,
                    '_blank',
                    'noreferrer noopener'
                  )
                }
              >
                <div className="h-full pt-[15px]">
                  <GithubSvg color="white" />
                </div>
                <div>
                  <strong>{capitalize(p)}</strong>
                  {<>&nbsp;</>}
                  {bonus}
                  <br />
                  (if you already gave a {p}, remove the {p} and {p} again)
                </div>
              </div>
              <div className="text-left flex items-center">1 point</div>
              <div className="text-left flex items-center">
                {data?.body?.bonuses.some(
                  (a: any) => a.identifier === `${p}-${bonus}`
                ) ? (
                  `Claimed`
                ) : (
                  <Button
                    disabled={loading}
                    onClick={bonusStar(bonus, p)}
                    size="sm"
                  >
                    Claim
                  </Button>
                )}
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

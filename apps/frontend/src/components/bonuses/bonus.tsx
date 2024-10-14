'use client';

import { Button } from '@frontend/components/button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { frozen, starsBonus } from '@frontend/utils/stars.bonus';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import GithubSvg from '@frontend/components/svgs/GithubSvg';
import { capitalize } from 'lodash';
import { productHuntBonus } from '@frontend/utils/product.hunt.bonus';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export function Bonuses({
  phKey,
  phRedirect,
}: {
  phKey: string;
  phRedirect: string;
}) {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const bonuses = useCallback(async () => {
    return (await fetch(`/api/dashboard/bonus`)).json();
  }, []);

  const phStatus = useCallback(async () => {
    return (await fetch(`/api/dashboard/bonus/ph-status`)).json();
  }, []);

  const { data, isLoading, mutate } = useSWR('bonuses', bonuses);
  const { data: dataPh, isLoading: phLoading } = useSWR('ph-status', phStatus);

  const connect = useCallback(() => {
    router.push(
      `https://api.producthunt.com/v2/oauth/authorize?client_id=${phKey}&redirect_uri=${encodeURIComponent(
        phRedirect!
      )}&response_type=code&scope=public+private`
    );
  }, []);

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

  const checkVote = useCallback(
    (id: string) => async () => {
      setLoading(true);
      const star = await (
        await fetch(`/api/dashboard/bonus/product-hunt`, {
          method: 'POST',
          body: JSON.stringify({
            id,
          }),
        })
      ).json();

      if (!star.success) {
        toast.error(`You need to upvote first`, {
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

  if (isLoading || phLoading) {
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
          {productHuntBonus.map((bonus, index) => (
            <div
              key={`bonus`}
              className="grid grid-cols-[30px,1fr,180px,180px] bg-[#191919] rounded-[12px] h-[72px] px-[32px]"
            >
              <div className="text-left flex items-center">
                {index + 2}
              </div>
              <div
                className="text-left flex items-center cursor-pointer gap-[10px]"
                onClick={() =>
                  window.open(
                    `https://www.producthunt.com/posts/${bonus.id}`,
                    '_blank',
                    'noreferrer noopener'
                  )
                }
              >
                <div>
                  <strong>Upvote {bonus.name} on Product Hunt</strong>
                  <br />
                  <div className="text-red-400 animate-bounce">
                    (This is a 24-hours bonus, hurry up!)
                  </div>
                </div>
              </div>
              <div className="text-left flex items-center">1 point</div>
              <div className="text-left flex items-center">
                {data?.body?.bonuses.some(
                  (a: any) => a.identifier === `producthunt-${bonus.id}`
                ) ? (
                  `Claimed`
                ) : !dataPh.isAuthenticated ? (
                  <Button disabled={loading} size="sm" onClick={connect}>
                    Connect Product Hunt
                  </Button>
                ) : (
                  <Button
                    disabled={loading}
                    size="sm"
                    onClick={checkVote(bonus.id)}
                  >
                    Check Vote
                  </Button>
                )}
              </div>
            </div>
          ))}
          {starsBonus
            .slice(0)
            .reverse()
            .map((bonus, index) =>
              ['star', 'fork'].flatMap((p, indexTop) => (
                <div
                  key={`${p}_${indexTop}_${index}_${bonus}`}
                  className={clsx(
                    index === 0 && 'animate-pulse relative',
                    'grid grid-cols-[30px,1fr,180px,180px] bg-[#191919] rounded-[12px] h-[72px] px-[32px]',
                    frozen.indexOf(bonus) > -1 &&
                      'pointer-events-none opacity-45'
                  )}
                >
                  {index === 0 && (
                    <div className="pointer-events-none absolute left-0 top-0 w-full h-full bg-green-500/30 -z-[1] rounded-[12px]" />
                  )}
                  <div className="text-left flex items-center">
                    {productHuntBonus.length + 2 * index + 2 + indexTop}
                  </div>
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
                      {bonus}{' '}
                      {frozen.indexOf(bonus) > -1 ? (
                        <span className="text-red-600">
                          Locked at the moment
                        </span>
                      ) : (
                        ''
                      )}
                      <br />
                      (if you already gave a {p}, remove the {p} and {p} again)
                    </div>
                  </div>
                  <div className="text-left flex items-center">1 point</div>
                  <div className="text-left flex items-center">
                    {data?.body?.bonuses.some(
                      (a: any) =>
                        a.identifier.toLowerCase() ===
                        `${p}-${bonus}`.toLowerCase()
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
              ))
            )}
        </div>
      </div>
    </div>
  );
}

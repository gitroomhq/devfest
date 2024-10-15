import { signIn, useSession } from 'next-auth/react';
import { Button } from '@frontend/components/button';
import { FC, useCallback, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { useSearchParams } from 'next/navigation';

const CheckEligibility: FC<{ id: string }> = (props) => {
  const auth = useSession();
  const url = useSearchParams();
  const claim = url?.get('claim') || '';

  const [eligible, setEligible] = useState(-2);

  useEffect(() => {
    if (
      !claim ||
      auth.status !== 'authenticated' ||
      auth?.data?.user?.id === props.id
    ) {
      return;
    }

    nocodeBonus();
  }, [auth, claim]);

  const nocodeBonus = useCallback(async () => {
    const data = await (
      await fetch(`/api/dashboard/nocode-bonus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: props.id
        }),
      })
    ).json();

    setEligible(data.status);
  }, [auth]);

  if (auth.status === 'loading') {
    return <></>;
  }

  if (!claim) {
    return (
      <div>
        <div className="mb-[20px]">
          Send this link to your friends to start earning points!
        </div>
        <CopyToClipboard
          text={window.location.href + '?claim=true'}
          onCopy={() => toast.success('Copied to clipboard')}
        >
          <Button>Copy Link</Button>
        </CopyToClipboard>
      </div>
    );
  }

  if (auth?.data?.user?.id === props.id) {
    return (
      <div className="mt-[10px] flex items-center justify-center">
        You can{"'"}t give a bonus to yourself
      </div>
    );
  }

  if (auth.status === 'unauthenticated') {
    return (
      <Button
        onClick={() =>
          signIn('github', {
            callbackUrl: window.location.href + '?claim=true',
            redirect: true,
          })
        }
      >
        Authenticate With GitHub
      </Button>
    );
  }

  if (eligible === -2) {
    return (
      <div className="flex items-center justify-center">
        <Oval
          color="#9070FF"
          secondaryColor="#9070FF"
          strokeWidth={5}
          width="140"
          height="140"
        />
      </div>
    );
  }

  if (eligible === -1) {
    return (
      <div className="mt-[10px] flex items-center justify-center">
        You are not authenticated
      </div>
    );
  }

  if (eligible === 0) {
    return (
      <div className="mt-[10px] flex items-center justify-center">
        You can{"'"}t give a bonus to yourself
      </div>
    );
  }

  if (eligible === 1 || eligible === 3) {
    return (
      <div className="mt-[10px] flex items-center justify-center">
        Bonus Claimed!
      </div>
    );
  }

  if (eligible === 2) {
    return (
      <div className="mt-[10px] flex items-center justify-center">
        You have already given a point to someone
      </div>
    );
  }

  if (eligible === 3) {
    return (
      <div className="mt-[10px] flex items-center justify-center">
        Bonus Claimed!
      </div>
    );
  }

  return <></>;
};

export default CheckEligibility;

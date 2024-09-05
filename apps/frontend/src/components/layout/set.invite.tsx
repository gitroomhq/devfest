'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { checkInvite, trySetToTeam } from '@frontend/app/actions/set.invite';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const SetInvite: FC<{ id: string }> = ({ id }) => {
  const session = useSession();
  const router = useRouter();
  const [isValid, setIsValid] = useState(true);
  const updateInvite = useCallback(async () => {
    if (session.status === 'unauthenticated') {
      if (await checkInvite(id)) {
        setTimeout(() => {
          signIn('github', {
            callbackUrl: window.location.href,
          });
        }, 3000);

        return;
      }

      setIsValid(false);
      return;
    }

    await trySetToTeam(id);
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  }, [id, session.status]);

  useEffect(() => {
    if (session.status === 'loading' || !id) return;
    updateInvite();
  }, [id, session.status]);

  if (!isValid) {
    return <>Invalid invite</>;
  }

  if (session.status === 'loading') {
    return null;
  }

  if (session.status === 'authenticated') {
    return <>You are being redirected to your new squad on DevFest AI</>;
  }
  return <>You are being redirected to DevFest AI GitHub registration</>;
};

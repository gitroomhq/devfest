import { useSession } from 'next-auth/react';
import { Button } from '@frontend/components/button';
import { FC, useCallback } from 'react';
import Swal from 'sweetalert2';

const BanUser: FC<{id: string, banned: boolean}> = (props) => {
  const session = useSession();
  const ban = useCallback(async () => {
    const sure = await Swal.fire({
      title: 'Are you sure?',
      text: 'Ban member?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Ban!',
      cancelButtonText: 'No',
    });

    if (!sure.isConfirmed) {
      return;
    }

    await fetch(`/api/ban-user/${props.id}/ban`, {
      method: 'POST',
    });

    window.location.reload();
  }, [props.id]);

  // @ts-ignore
  if (!session?.data?.user?.isMod) {
    return <></>;
  }
  return (
    <div>
      <Button type="button" size="sm" glow={false} variant="secondary" onClick={ban}>
        {props.banned ? 'Unban' : 'Ban'}
      </Button>
    </div>
  );
};

export default BanUser;

import { useSession } from 'next-auth/react';
import { Button } from '@frontend/components/button';
import { FC, useCallback } from 'react';
import Swal from 'sweetalert2';

const RemoveFromSquad: FC<{id: string}> = (props) => {
  const session = useSession();
  const removeFromSquad = useCallback(async () => {
    const sure = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove!',
      cancelButtonText: 'No',
    });

    if (!sure.isConfirmed) {
      return;
    }

    await fetch(`/api/squad/${props.id}/remove`, {
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
      <Button type="button" size="sm" glow={false} variant="secondary" onClick={removeFromSquad}>
        Remove from Squad
      </Button>
    </div>
  );
};

export default RemoveFromSquad;

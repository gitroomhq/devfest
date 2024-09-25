import { Button } from '@frontend/components/button';
import { FC, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const EventDialog: FC<{ close: () => void; event: {id: number} }> = (props) => {
  const { close, event } = props;
  const auth = useSession();
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (auth.status === 'authenticated') {
      setEmail(auth?.data?.user?.email || '');
    }
  }, [auth.status]);

  const save: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();
    if (email) {
      await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, id: event.id }),
      });
    }

  }, [email, event]);

  return (
    <div
      className="fixed left-0 top-0 w-full h-full flex justify-center items-center z-[500] little-black"
      onClick={close}
    >
      <form
        onSubmit={save}
        onClick={(p) => p.stopPropagation()}
        className="p-[50px] rounded-[16px] border border-[#704DFF]/30 max-w-[540px] w-full mx-auto bg-[#191919]"
      >
        <div className="flex flex-col gap-[24px] text-center">
          <div className="text-[16px] text-[#DEDEDE]">[ Email Address ]</div>
          <div className="bg-[#2D2D2D] rounded-[100px] h-[68px] px-[32px]">
            <input
              value={email}
              placeholder="Your Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full h-full outline-none text-white bg-transparent"
            />
          </div>
          <div>
            <Button size="sm" type="submit">
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventDialog;

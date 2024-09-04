import { Loader } from "@frontend/components/layout/loader";
import {SetFriendInvite} from "@frontend/components/layout/set.friend.invite";

export default async function Invite({
  params: { invite },
}: {
  params: { invite: string };
}) {
  return (
    <div className="text-center text-[30px] flex flex-col mt-[100px]">
      <div>
        <SetFriendInvite id={invite} />
      </div>

      <div className="flex justify-center mt-[100px]">
        <Loader />
      </div>
    </div>
  );
}

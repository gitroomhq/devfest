import { FC } from "react";
import { User } from "@frontend/components/dashboard/main";
import GithubSvg from "@frontend/components/svgs/GithubSvg";

export const Members: FC<{ user: User }> = (props) => {
  return (
    <div className="flex gap-[32px]">
      {props.user.squad.members.map((p) => (
        <div className="flex flex-col items-center" key={p.id}>
          <div className="w-[130px] h-[130px] bg-black rounded-full overflow-hidden">
            <img
              className="relative z-[1] aspect-square h-full w-full rounded-full"
              alt={p.name}
              src={p.profilePicture}
            />
          </div>
          <div className="flex gap-[4px] items-center justify-center mt-[16px]">
            <div>{p.name}</div>
            <div>
              <a href={`https://github.com/${p.handle}`} target="_blank">
                <GithubSvg color="white" width={16} height={16} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

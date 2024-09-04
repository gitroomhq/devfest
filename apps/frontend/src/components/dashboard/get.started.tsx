import { Button } from "@frontend/components/button";
import FAQ from "../../sections/FAQ";
import { FC, useCallback } from "react";

export const GetStarted: FC<{ rerenderPage: () => void }> = (props) => {
  const createAnewSquad = useCallback(async () => {
    await fetch("/api/dashboard/squad/create", {
      method: "POST",
      cache: "no-cache",
    });

    alert("Squad created successfully");
    props.rerenderPage();
  }, []);

  const joinARandomSquad = useCallback(async () => {
    await fetch("/api/dashboard/squad/random", {
      method: "POST",
      cache: "no-cache",
    });

    alert("You have joined a random squad");
    props.rerenderPage();
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="mb-10 text-center font-inter mx-auto max-w-4xl font-semibold text-[100px] md:text-42 xs:max-w-[246px]">
        Let{"'"}s get you started
      </h1>

      <div className="flex gap-[20px] justify-center mb-[200px]">
        <Button onClick={createAnewSquad}>Create a new Squad</Button>
        <Button onClick={joinARandomSquad}>Join a random Squad</Button>
      </div>

      <FAQ
        items={[
          {
            question: "Should I join an existing squad or start a new one?",
            answer: (
              <>
                To win the game, you squad will have to gain as many points as
                possible. <br />
                The more people you have in your squad the higher the chances to
                rank higher.
                <br />
                <br />
                If you already have some friends that you want to play with, you
                can create a new squad and invite them to join.
                <br />
                <br />
                If not, you can join a random squad and make new friends.
                <br />
                <br />
                <strong>P.S</strong> even if you open a new squad, you can turn
                on the random join option, and random people will join your
                squad.
              </>
            ),
          },
          {
            question: "My friend already created a squad, how can I join?",
            answer: <>Please don{"'"}t create a new squad or join a random one.<br />Instead, ask your friend to copy a custom link from the squad page and send you.</>,
          },
          {
            question: "When will you start counting points",
            answer: <>The competition will start at October 1st</>,
          },
          {
            question: "I am not sure what to do",
            answer: <>Join our Discord, we will try our best to help you</>,
          },
        ]}
      />
    </div>
  );
};

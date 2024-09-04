"use client";

import React, { FC, useState } from "react";

import { Button } from "@frontend/components/button";
import { FAQ_ITEMS } from "@frontend/utils/constants";

const FAQItem: FC<{ question: string; answer: any; spliter: boolean }> = (
  props,
) => {
  const { question, answer, spliter } = props;
  const [show, setShow] = useState(false);
  return (
    <div
      key={question}
      className={`flex flex-col gap-2 md:gap-3 pb-6 md:pb-8 cursor-pointer ${
        spliter && "border-b border-b-[#252525]"
      }`}
      onClick={() => setShow(!show)}
    >
      <div className="flex justify-between gap-4 md:gap-10 cursor-pointer">
        <h4 className="select-none">{question}</h4>
        <FAQCollapseButton
          className={`${
            show ? "rotate-180 fill-purple" : "rotate-0 fill-white"
          } transition-all`}
        />
      </div>
      <h5
        {...(typeof answer === "string"
          ? {
              dangerouslySetInnerHTML: {
                __html: answer,
              },
            }
          : { children: answer })}
        className={`max-w-[808px] ${show ? "block" : "hidden"}`}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

const FAQCollapseButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props,
) => {
  return (
    <button {...props}>
      <svg
        className="w-[24px] h-[24px] md:w-[33px] md:h-[33px]"
        viewBox="0 0 33 33"
        fill="inherit"
      >
        <path
          d="M18.3457 20.8131L20.9724 18.1865L25.2524 13.9065C26.1457 12.9998 25.5057 11.4531 24.2257 11.4531L15.919 11.4531L8.43904 11.4531C7.15904 11.4531 6.51904 12.9998 7.42571 13.9065L14.3324 20.8131C15.4257 21.9198 17.239 21.9198 18.3457 20.8131Z"
          fill="inherit"
        />
      </svg>
    </button>
  );
};

const FAQ: FC<{
  items: { question: string; answer: any }[];
}> = (props) => {
  const { items } = props;
  return (
    <section id="faq">
      <h2>FAQ</h2>
      <div className="max-w-[900px] w-full space-y-6 md:space-y-8">
        {items.map((item, idx) => (
          <FAQItem
            key={item.question}
            {...item}
            spliter={idx < items.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;

import Image from "next/image";

const Swag = () => {
  return (
    <section id="swag">
      <div className="w-fit lg:w-full p-px bg-gradient-to-bl from-[#704DFF80] to-[#FFFFFF1A] rounded-[24px] md:rounded-[40px]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-14 lg:h-[auto] p-4 lg:p-8 bg-gradient-to-l from-[#180D36FF] to-[#000000] rounded-[24px] md:rounded-[40px]">
          <div className="hidden lg:block lg:-mb-[88px]">
            <Image src="/svgs/Swag.svg" alt="" width={713} height={625} />
          </div>
          <Image
            src="/svgs/Swag-mobile.png"
            alt=""
            width={607}
            height={532}
            className="block lg:hidden"
          />
          <div className="max-w-[510px] space-y-6 pb-9 lg:pb-0">
            <h6>[ Swag ]</h6>
            <h2 className="text-left">
              Grab your <span className="text-purple">exclusive swag </span>and
              join the fun
            </h2>
            <h5 className="max-w-[426px]">
              Participate in exciting challenges and receive unique goodies from
              our sponsors.
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Swag;

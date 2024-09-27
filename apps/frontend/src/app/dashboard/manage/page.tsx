import Link from 'next/link';
import { repositoriesToApprove } from '@frontend/queries/repositories';
import clsx from 'clsx';
import GithubSvg from '@frontend/components/svgs/GithubSvg';
import dynamic from 'next/dynamic';
const RemoveFromSquad = dynamic(() => import('@frontend/components/mods/approve.disapproved'), { ssr: false });

export default async function Index() {
  const repositoriesList = await repositoriesToApprove();
  return (
    <>
      <h1 className="mb-10 text-center font-inter mx-auto max-w-2xl font-semibold leading-[100px] text-[100px] md:text-42 xs:max-w-[246px]">
        Manage Repositories
      </h1>

      <div>
        <div className="flex flex-col w-full max-w-[800px] mx-auto gap-2.5">
          <div className="text-center mb-[30px] text-[20px]">
            You can contribute to repositories not on the list
            <br />
            If we find them useful, we will whitelist them
          </div>
          <div className="grid grid-cols-[100px,1fr,200px] rounded-[12px] bg-chatGrad h-[72px] px-[32px]">
            <div className="text-left flex items-center">PLACE</div>
            <div className="flex items-center">NAME</div>
            <div></div>
          </div>
          {repositoriesList.map((p, index) => (
            <div
              key={p.id}
              className={clsx(
                p.sponsored === 0 && 'bg-[#191919] hover:bg-[#333333]',
                p.sponsored === 1 && 'bg-[#70baff] text-black',
                p.sponsored === 2 && 'bg-[#ffd02d] text-black',
                'cursor-pointer grid grid-cols-[100px,1fr,200px] rounded-[12px] h-[72px] px-[32px]'
              )}
            >
              <div className="text-left flex items-center">{index + 1}</div>
              <div className="flex items-center gap-[10px]">
                <GithubSvg
                  color={clsx(p.sponsored === 0 ? 'white' : 'black')}
                />
                <Link
                  href={`https://github.com/${p.nameOwner}`}
                  target="_blank"
                >
                  {p.nameOwner}
                </Link>
              </div>
              <div className="flex justify-center items-center h-full">
                <RemoveFromSquad id={p.id} approve={p.allowed}  />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

'use client';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { starsBonus } from '@frontend/utils/stars.bonus';
import { productHuntBonus } from '@frontend/utils/product.hunt.bonus';
import { useRouter } from 'next/navigation';

const ShowBonuses: FC = () => {
  const [bonus, setBonus] = useState<any>(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const latestBonus = starsBonus?.[starsBonus?.length - 1 || 0] || '';
    const latestProductHunt =
      productHuntBonus?.[productHuntBonus?.length - 1 || 0]?.id || '';
    const wantedBonus = [latestBonus, latestProductHunt]
      .filter((f) => f)
      .join('-');
    const getLatestBonus = localStorage.getItem('latestBonus') || '';
    if (wantedBonus !== getLatestBonus) {
      setBonus(true);
      setValue(wantedBonus);
    }
  }, []);
  const closeBonuses = () => {
    setBonus(false);
    localStorage.setItem('latestBonus', value);
  };

  const moveToBonuses = () => {
    router.push('/dashboard/bonuses');
    closeBonuses();
  }

  if (!bonus) {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 w-full h-full little-black z-[300] flex justify-center items-center"
      onClick={closeBonuses}
    >
      <div
        className="relative bg-white p-[40px] rounded-[20px] flex flex-col gap-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={closeBonuses}
          className="cursor-pointer absolute -right-[10px] -top-[10px] rounded-full bg-red-600 w-[30px] h-[30px] flex justify-center items-center"
        >
          X
        </div>
        <div
          className="text-black text-[20px] text-center font-bold cursor-pointer"
          onClick={closeBonuses}
        >
          <div className="text-red-500 text-[30px]" onClick={moveToBonuses}>
            New bonuses!
            <br />
            <Link
              href="/dashboard/bonuses"
              onClick={closeBonuses}
              className="underline hover:font-bold"
            >
              Check out the bonus page!
            </Link>
            <br />
          </div>
          <img src="/bonus.png" className="w-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default ShowBonuses;

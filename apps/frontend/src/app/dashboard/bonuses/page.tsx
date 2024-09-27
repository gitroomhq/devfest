import { Bonuses } from '@frontend/components/bonuses/bonus';
import { Metadata } from 'next';
import { addProductHunt } from '@frontend/utils/add.product.hunt';
import { auth } from '@frontend/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'DevFest AI 2024 - Bonuses',
  description: 'Collaborate with your teammate and win awesome SWAG - Bonuses.',
};

export default async function Page(params?: any) {
  const user = await auth();
  if (params?.searchParams?.code) {
    await addProductHunt(user?.user?.id!, params.searchParams.code);
    return redirect('/dashboard/bonuses');
  }
  return (
    <Bonuses
      phKey={process.env.PUBLIC_NEXT_PRODUCT_HUNT_API_KEY!}
      phRedirect={process.env.PUBLIC_NEXT_PRODUCT_HUNT_REDIRECT_URI!}
    />
  );
}

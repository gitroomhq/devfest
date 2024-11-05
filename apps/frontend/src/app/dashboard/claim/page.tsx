import { Metadata } from 'next';
import { Form } from '@frontend/components/claim/claim';
import { auth } from '@frontend/auth';
import { loadUserUnclaimedPrizes } from '@db/queries/load.member.prizes';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'DevFest AI 2024 - Claim',
  description:
    'Collaborate with your teammate and win awesome SWAG - claim you prize.',
};

export default async function Page() {
  const user = await auth();
  const prizes = await loadUserUnclaimedPrizes(user?.user?.id!);
  if (prizes.length === 0) {
    return redirect('https://airtable.com/appXgTB1DffKq9cHX/shrF5Wm8FEi73N759/tbl97h6ywn9o3QOkV');
  }

  return <Form prizes={prizes} />;
}

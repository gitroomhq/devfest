import {auth} from "@frontend/auth";
import {redirect} from "next/navigation";

export default async function Page() {
  const user = await auth();
  if (!user) {
    return redirect('/');
  }

  // @ts-ignore
  return redirect(`/ticket/${user.user.handle}`)
}

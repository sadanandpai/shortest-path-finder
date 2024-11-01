import { redirect } from "next/navigation";
import { SignIn } from "@/components/auth/sign-in";
import { getLoggedInUser } from "@/lib/server/actions/auth";
import { routes } from "@/lib/common/routes";

export default async function SignInPage() {
  const user = await getLoggedInUser();

  if (user) {
    redirect(routes.profile);
  }

  return <SignIn />;
}

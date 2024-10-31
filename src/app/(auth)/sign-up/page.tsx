import { redirect } from "next/navigation";
import { SignUp } from "@/components/auth/sign-up";
import { getLoggedInUser } from "@/lib/server/actions/auth";
import { routes } from "@/lib/common/routes";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) {
    redirect(routes.profile);
  }

  return <SignUp />;
}

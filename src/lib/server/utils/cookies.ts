import { cookies } from "next/headers";

export async function setSecureCookie(cookieName: string, secret: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}

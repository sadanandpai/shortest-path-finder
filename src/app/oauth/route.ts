import { cookies } from "next/headers";
import { cookieName } from "@/lib/server/config/auth";
import { NextRequest, NextResponse } from "next/server";
import { signInWithSecretController } from "@/lib/server/controller/auth";
import { routes } from "@/lib/common/routes";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.redirect(routes.signIn);
  }

  const sessionSecret = await signInWithSecretController(userId, secret);
  const cookieStore = await cookies();
  cookieStore.set(cookieName, sessionSecret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return NextResponse.redirect(
    `${request.nextUrl.origin}${routes.oauthRedirection}`
  );
}

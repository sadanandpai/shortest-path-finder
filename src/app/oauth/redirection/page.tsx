"use client";

export default function OAuthPage() {
  // Redirect to the profile after user is redirected back from the OAuth provider
  // The client side redirection is mandatory else cookies won't be set properly
  if (typeof window !== "undefined") {
    window.location.href = "/profile";
  }

  return <>Redirecting to the application...</>;
}

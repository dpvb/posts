"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      className="rounded-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-2 py-2 text-white transition-all duration-300"
      onClick={() => signIn("discord")}
    >
      Sign in with Discord
    </button>
  );
}

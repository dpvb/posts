"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="rounded-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-2 py-2 text-lg text-white transition-all duration-300"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

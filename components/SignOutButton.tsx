"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="bg-gradient-to-r text-lg from-blue-500 via-blue-600 to-blue-700 rounded-md px-2 py-2 text-white transition-all duration-300"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button
            className="rounded-md bg-blue-500 px-2 py-2 text-lg text-white transition-all duration-300 hover:bg-blue-700"
            onClick={() => signOut()}
        >
            Sign out
        </button>
    );
}

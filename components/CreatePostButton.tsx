"use client";

import { useRouter } from "next/navigation";

export default function CreatePostButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/create")}
            className="w-fit rounded-md bg-blue-500 px-8 py-2 text-lg text-white"
        >
            Create Post
        </button>
    );
}

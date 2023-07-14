"use client";

import { prisma } from "@/lib/prisma";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

export default function CreatePostForm() {
    const router = useRouter();
    const [text, setText] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (text === "") {
            return;
        }

        const trimmed = text.replace(/\n{3,}/g, "\n\n");

        await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({ content: trimmed }),
        });

        window.location.href = "/";
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex w-fit flex-col rounded-md border border-solid border-gray-600">
                <div className="flex">
                    <h1 className="my-2 ml-6 text-2xl font-bold text-white">
                        Create a Post
                    </h1>
                </div>
                <div className="p-6 pt-0">
                    <textarea
                        placeholder="Write something here"
                        value={text}
                        onInput={(
                            event: React.FormEvent<HTMLTextAreaElement>
                        ) => {
                            setText(event.currentTarget.value);
                            event.currentTarget.style.height = "auto";
                            event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                        }}
                        className="scrollbar-thin max-h-[400px] w-[500px] resize-none bg-inherit text-gray-200 outline-none"
                    />
                </div>
                <div className="flex justify-center gap-10 border-t border-solid border-gray-600 py-4">
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="rounded-md bg-red-500 px-6 py-1 text-lg text-white"
                    >
                        Back
                    </button>

                    <button className="mr-4 rounded-md bg-blue-500 px-6 py-1 text-lg text-white">
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
}

"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreatePostForm() {
    const characterLimit: number = 250;
    const router = useRouter();
    const [text, setText] = useState("");

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setText(event.currentTarget.value);
        event.currentTarget.style.height = "auto";
        event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
    };

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
                <div className="px-6 pb-2 pt-0">
                    <textarea
                        placeholder="Write something here"
                        value={text}
                        onInput={handleInput}
                        maxLength={characterLimit}
                        className="scrollbar-thin max-h-[400px] w-[calc(100vw-100px)] resize-none bg-inherit text-gray-200 outline-none md:w-[500px]"
                    />
                    <p className="text-right text-gray-400">
                        {text.length}/{characterLimit}
                    </p>
                </div>
                <div className="flex justify-center gap-10 border-t border-solid border-gray-600 py-4">
                    <button
                        type="button"
                        onClick={() => (window.location.href = "/")}
                        className="rounded-md bg-red-500 px-6 py-1 text-lg text-white"
                    >
                        Back
                    </button>

                    <button className=" rounded-md bg-blue-500 px-6 py-1 text-lg text-white">
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
}

import { User, Post, Like } from "@prisma/client";
import Image from "next/image";
import formatTimeString from "@/lib/utils";
import PostLike from "./PostLike";

export default function PostComp({ post }: { post: Post & { author: User } }) {
    return (
        <div className="mx-auto flex w-11/12 flex-col rounded-md border border-solid border-gray-600 bg-gray-800 p-3 text-white md:w-[540px]">
            <div className="flex items-center gap-2">
                <Image
                    src={post.author.image ?? ""}
                    alt="profile picture"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                <h3 className="text-lg">{post.author.name}</h3>
            </div>
            <pre className="overflow-auto whitespace-pre-wrap font-sans">
                {post.content}
            </pre>
            <PostLike postId={post.id} />
            <p className="mt-1 text-xs italic text-gray-400">
                {formatTimeString(new Date(post.createdAt))}
            </p>
        </div>
    );
}

import { Post, User } from "@prisma/client";
import Image from "next/image";

export default function Post({ post }: { post: Post & { author: User } }) {
    return (
        <div className="mb-[-1px] flex w-[540px] flex-col border border-solid border-gray-600 p-2 text-white">
            <div className="flex items-center gap-2">
                <Image
                    src={post.author.image ?? ""}
                    alt="profile picture"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                <h3 className="text-lg">{post.author.name}</h3>
                <h3 className="text-md italic text-gray-400">
                    {post.createdAt.toDateString()}
                </h3>
            </div>
            <pre>{post.content}</pre>
        </div>
    );
}

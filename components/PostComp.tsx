import { User, Post, Like } from "@prisma/client";
import Image from "next/image";
import formatTimeString from "@/lib/utils";
import PostLike from "./PostLike";
import Link from "next/link";

export default function PostComp({
    post,
}: {
    post: Post & { author: User; likes: Like[] };
}) {
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
            <Link href={`/post/${post.id}`}>
                <pre className="overflow-auto whitespace-pre-wrap font-sans">
                    {post.content}
                </pre>
            </Link>
            <div className="flex items-center gap-4">
                <PostLike likes={post.likes} postId={post.id} />
                <Link href={`/post/${post.id}`}>
                    <svg
                        fill="#9ca3af"
                        height="20px"
                        width="20px"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 194.818 194.818"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g>
                                {" "}
                                <path d="M185.818,2.161h-57.04c-4.971,0-9,4.029-9,9s4.029,9,9,9h35.312l-86.3,86.3c-3.515,3.515-3.515,9.213,0,12.728 c1.758,1.757,4.061,2.636,6.364,2.636s4.606-0.879,6.364-2.636l86.3-86.3v35.313c0,4.971,4.029,9,9,9s9-4.029,9-9v-57.04 C194.818,6.19,190.789,2.161,185.818,2.161z"></path>{" "}
                                <path d="M149,77.201c-4.971,0-9,4.029-9,9v88.456H18v-122h93.778c4.971,0,9-4.029,9-9s-4.029-9-9-9H9c-4.971,0-9,4.029-9,9v140 c0,4.971,4.029,9,9,9h140c4.971,0,9-4.029,9-9V86.201C158,81.23,153.971,77.201,149,77.201z"></path>{" "}
                            </g>{" "}
                        </g>
                    </svg>
                </Link>
            </div>
            <p className="mt-1 text-xs italic text-gray-400">
                {formatTimeString(new Date(post.createdAt))}
            </p>
        </div>
    );
}

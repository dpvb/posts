import { User, Post, Like } from "@prisma/client";
import Image from "next/image";
import formatTimeString from "@/lib/utils";
import PostLike from "./PostLike";
import Link from "next/link";
import LinkIcon from "@mui/icons-material/Link";

interface LikeItem {
    userId: string;
    postId: number;
    user: User;
}

export default function PostComp({
    post,
}: {
    post: Post & { author: User; likes: LikeItem[] };
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
                <h3 className="text-lg font-bold">{post.author.name}</h3>
            </div>
            <Link href={`/post/${post.id}`}>
                <pre className="my-2 overflow-auto whitespace-pre-wrap font-sans">
                    {post.content}
                </pre>
            </Link>
            <div className="flex items-center gap-4">
                <PostLike likes={post.likes} postId={post.id} />

                <Link className="flex items-center" href={`/post/${post.id}`}>
                    <LinkIcon className="text-gray-400 transition-colors duration-100 hover:text-blue-400" />
                </Link>
            </div>
            <p className="mt-1 text-xs italic text-gray-400">
                {formatTimeString(new Date(post.createdAt))}
            </p>
        </div>
    );
}

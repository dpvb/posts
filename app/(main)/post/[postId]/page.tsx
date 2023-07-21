import PostComp from "@/components/PostComp";
import { prisma } from "@/lib/prisma";
import { Like, Post, User } from "@prisma/client";

interface LikeItem {
    userId: string;
    postId: string;
    user: User;
}

interface PostType extends Post {
    author: User;
    likes: LikeItem[];
}

async function getPost(postId: number) {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(postId),
        },
        include: {
            author: true,
            likes: {
                include: {
                    user: true,
                },
            },
        },
    });

    return post;
}

export default async function PostPage({
    params,
}: {
    params: { postId: number };
}) {
    const post = await getPost(params.postId);
    if (post == null) {
        return <div className="text-white">ERROR HERE</div>;
    }

    return (
        <div className="mt-20">
            <PostComp post={post} />
        </div>
    );
}

"use client";

import { Like } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function PostLike({
    likes,
    postId,
}: {
    likes: Like[];
    postId: number;
}) {
    const [liked, setLiked] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        setLiked(likes.some((like) => like.userId === session?.user?.id));
    }, [likes]);

    const numLikes = likes.length;

    const handleLikePress = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (liked) {
            const response = await fetch("/api/like", {
                method: "DELETE",
                body: JSON.stringify({ postId: postId }),
            });
            const data = await response.json();
            setLiked(false);
        } else {
            const response = await fetch("/api/like", {
                method: "POST",
                body: JSON.stringify({ postId: postId }),
            });
            const data = await response.json();
            setLiked(true);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <button onClick={handleLikePress} className="bg-blue-500">
                {!liked ? "Like" : "Dislike"}
            </button>
            <div className="text-sm">{numLikes} Likes</div>
        </div>
    );
}

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
    const [numLikes, setNumLikes] = useState(likes.length);
    const [liked, setLiked] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        setLiked(likes.some((like) => like.userId === session?.user?.id));
    }, [session]);

    const handleLikePress = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (liked) {
            fetch("/api/like", {
                method: "DELETE",
                body: JSON.stringify({ postId: postId }),
            });
            setLiked(false);
            setNumLikes((prevLikes) => prevLikes - 1);
        } else {
            fetch("/api/like", {
                method: "POST",
                body: JSON.stringify({ postId: postId }),
            });
            setLiked(true);
            setNumLikes((prevLikes) => prevLikes + 1);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={handleLikePress}
                className={`${
                    liked ? "text-blue-400" : "text-gray-400"
                } flex items-center gap-1`}
            >
                <span className={`inline-block text-2xl`}>♥</span>
                <span className="inline-block text-sm">{numLikes}</span>
            </button>
        </div>
    );
}

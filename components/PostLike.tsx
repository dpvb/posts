"use client";

import { Like } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function PostLike({ postId }: { postId: number }) {
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        console.log(`FETCHING LIKES FOR POST: ${postId}`);
        fetch(`/api/like?postId=${postId}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setLikes(data);
                setLiked(
                    data.some((like: Like) => like.userId === session?.user?.id)
                );
            });

        // setLiked(likes.some((like: Like) => like.userId === session?.user?.id));
    }, [session, liked]);

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
            <div className="text-sm">{likes.length} Likes</div>
        </div>
    );
}

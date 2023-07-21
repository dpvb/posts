"use client";

import { Like, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Tooltip } from "react-tooltip";
import LikesModal from "./LikesModal";
import { PictureInPictureSharp } from "@mui/icons-material";

interface LikeItem {
    userId: string;
    postId: number;
    user: User;
}

export default function PostLike({
    likes,
    postId,
}: {
    likes: LikeItem[];
    postId: number;
}) {
    const [numLikes, setNumLikes] = useState(likes.length);
    const [liked, setLiked] = useState(false);
    const { data: session } = useSession();
    const [showLikesModal, setShowLikesModal] = useState(false);

    useEffect(() => {
        setLiked(likes.some((like) => like.userId === session?.user?.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <a id={`like-button-${postId}`}>
                <button
                    onClick={handleLikePress}
                    className={`${
                        liked ? "text-blue-400" : "text-gray-400"
                    } flex items-center gap-1 transition-colors duration-100 hover:text-blue-400`}
                >
                    {liked ? (
                        <FavoriteIcon fontSize="small" />
                    ) : (
                        <FavoriteBorderIcon fontSize="small" />
                    )}
                    <span className="inline-block text-sm">{numLikes}</span>
                </button>
            </a>
            <Tooltip
                delayShow={500}
                clickable
                anchorSelect={`#like-button-${postId}`}
                place="left"
            >
                <button onClick={() => setShowLikesModal(true)}>
                    View Likes
                </button>
            </Tooltip>
            <LikesModal
                visible={showLikesModal}
                close={() => setShowLikesModal(false)}
                likes={likes}
            />
        </div>
    );
}

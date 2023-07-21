import { Like, User } from "@prisma/client";
import Image from "next/image";

interface LikeItem {
    userId: string;
    postId: number;
    user: User;
}

export default function LikesModal({
    visible,
    close,
    likes,
}: {
    visible: boolean;
    close: () => void;
    likes: LikeItem[];
}) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="flex w-[300px] flex-col rounded-md border-2 border-solid border-blue-400 bg-gray-800 py-2">
                <div className="flex justify-between px-2 ">
                    <div className="text-3xl font-bold text-gray-200">
                        Likes
                    </div>
                    <button
                        className="text-2xl text-gray-200"
                        onClick={() => close()}
                    >
                        X
                    </button>
                </div>
                <div className="mt-4 flex flex-col gap-2 px-2">
                    {likes.map((like) => {
                        return (
                            <div
                                className="flex items-center gap-2 rounded-md py-1 pl-1 transition-colors duration-150 hover:bg-gray-600"
                                key={like.user.id}
                            >
                                {like.user.image && (
                                    <Image
                                        src={like.user.image}
                                        width={32}
                                        height={32}
                                        className="rounded-full border-2 border-solid border-blue-400"
                                        alt={
                                            like.user.name +
                                            "'s Profile Picture"
                                        }
                                    />
                                )}
                                <p className="text-lg text-gray-200">
                                    {like.user.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

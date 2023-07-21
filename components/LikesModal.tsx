import { prisma } from "@/lib/prisma";
import { Like } from "@prisma/client";

interface LikeListItem {
    userId: string;
    name: string;
}

// const generateLikeList = async (likes: Like[]) => {
//     const likeList: LikeListItem[] = [];
//     likes.forEach(async (like) => {
//         const user = await prisma.user.findUnique({
//             where: {
//                 id: like.userId,
//             },
//         });

//         if (user === null) {
//             return;
//         }

//         if (user.name === null) {
//             return;
//         }

//         likeList.push({
//             userId: like.userId,
//             name: user.name,
//         });
//     });

//     return likeList;
// };

export default function LikesModal({
    visible,
    close,
    likes,
}: {
    visible: boolean;
    close: () => void;
    likes: Like[];
}) {
    if (!visible) return null;

    // const likeList: LikeListItem[] = await generateLikeList(likes);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="flex w-[300px] flex-col bg-gray-800">
                <div className="flex justify-between px-2 ">
                    <div className="text-3xl">Likes</div>
                    <button
                        className="text-2xl text-gray-400"
                        onClick={() => close()}
                    >
                        X
                    </button>
                </div>
                <div>
                    {/* {likeList.map((item, index) => {
                        return <div key={index}>{item.name}</div>;
                    })} */}
                </div>
            </div>
        </div>
    );
}

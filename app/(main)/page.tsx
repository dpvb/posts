import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@/components/Header";
import CreatePostButton from "@/components/CreatePostButton";
import { prisma } from "@/lib/prisma";
import Post from "@/components/Post";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <main className="mt-20 flex flex-col items-center">
            <CreatePostButton />
            {posts.map((post) => {
                return <Post key={post.id} post={post} />;
            })}
        </main>
    );
}

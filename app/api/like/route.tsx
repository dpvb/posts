import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email!,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await request.json();

    const like = await prisma.like.create({
        data: {
            userId: user.id,
            postId: postId,
        },
    });

    return NextResponse.json(like, { status: 201 });
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email!,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await request.json();
    const like = await prisma.like.delete({
        where: {
            userId_postId: {
                userId: user.id,
                postId: postId,
            },
        },
    });
    3;
    return NextResponse.json(like, { status: 200 });
}

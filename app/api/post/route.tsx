import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const page = req.nextUrl.searchParams.get("page");
    const pageSize = 10;
    const offset = (Number(page) - 1) * pageSize;

    try {
        const posts = await prisma.post.findMany({
            take: pageSize,
            skip: offset,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: true,
            },
        });

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

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

    const { content } = await request.json();

    const post = await prisma.post.create({
        data: {
            content: content,
            authorId: user.id,
        },
    });

    return NextResponse.json(post, { status: 201 });
}

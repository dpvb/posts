"use client";

import { Like, Post, User } from "@prisma/client";
import React, { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useIntersection } from "@mantine/hooks";
import PostComp from "./PostComp";
import Link from "next/link";

interface PostType extends Post {
    author: User;
    likes: Like[];
}

export default function Feed() {
    const lastPostRef = useRef<HTMLElement>(null);
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    const fetchPosts = async ({ pageParam = 1 }) => {
        console.log(`FETCHING POST PAGE: ${pageParam}`);
        const response = await fetch(`/api/post?page=${pageParam}`);
        const data = await response.json();
        return data;
    };

    const { data, fetchNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery("posts", fetchPosts, {
            getNextPageParam: (_, pages) => {
                return pages.length + 1;
            },
        });

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage]);

    const posts = data?.pages.flatMap((page) => page);

    return (
        <div className="pb-10">
            {isLoading ? (
                <div className="animate-pulse rounded-full bg-blue-200 px-3 py-1 text-center text-xs font-medium leading-none text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    loading...
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {posts?.map((post: PostType, index) => {
                        if (index === posts.length - 1) {
                            return (
                                <div key={post.id} ref={ref}>
                                    <PostComp key={post.id} post={post} />
                                </div>
                            );
                        } else {
                            return (
                                <div key={post.id}>
                                    <PostComp key={post.id} post={post} />
                                </div>
                            );
                        }
                    })}
                </div>
            )}

            {isFetchingNextPage && (
                <div className="mx-auto mt-2 w-fit animate-pulse rounded-full bg-blue-200 px-3 py-1 text-center text-xs font-medium leading-none text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    loading...
                </div>
            )}
        </div>
    );
}

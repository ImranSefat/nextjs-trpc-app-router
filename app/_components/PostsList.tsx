"use client";
import { useState } from "react";
import { trpc } from "../_trpc/client";

export default function PostsList() {
  const getPosts = trpc.getPosts.useQuery();
  const addPost = trpc.addPost.useMutation({
    onSettled() {
      setcontent("");
      getPosts.refetch();
    },
  });

  const [content, setcontent] = useState("");
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div className="w-full flex flex-col gap-2">
        {getPosts.data?.map((post) => (
          <div
            className="border-2 border-gray-300 p-2 rounded-lg w-full text-white"
            key={post.id}
          >
            {post.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={content}
        onChange={(e) => setcontent(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded-lg w-full text-black"
        placeholder="What's on your mind?"
      />
      <button
        onClick={() => {
          if (!content) return;
          addPost.mutate(content);
        }}
        className="bg-blue-500 text-white p-2 rounded-lg "
      >
        Create Post
      </button>
    </div>
  );
}

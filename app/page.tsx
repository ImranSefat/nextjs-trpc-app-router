import Image from "next/image";
import PostsList from "./_components/PostsList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <PostsList />
      </div>
    </main>
  );
}

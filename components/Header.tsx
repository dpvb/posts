import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function Header() {
  return (
    <div className="fixed left-0 top-0 z-20 flex h-16 w-full items-center justify-around border-b border-gray-600 bg-gray-900 py-2">
      <Link href="/">
        <h1 className="text-4xl text-white">Posts</h1>
      </Link>
      <SignOutButton />
    </div>
  );
}

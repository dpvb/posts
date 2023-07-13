import SignOutButton from "./SignOutButton";

export default function Header() {
  return (
    <div className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-600 flex items-center py-2 justify-around">
      <h1 className="text-white text-4xl">Posts</h1>
      <SignOutButton />
    </div>
  );
}

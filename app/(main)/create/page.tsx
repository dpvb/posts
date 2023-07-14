import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import CreatePostForm from "@/components/CreatePostForm";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mt-20 flex justify-center">
      <CreatePostForm />
    </div>
  );
}

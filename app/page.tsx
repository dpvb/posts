import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="">
      <Header />
      <h1 className="text-3xl text-center">Home</h1>
      <Modal />
    </main>
  );
}

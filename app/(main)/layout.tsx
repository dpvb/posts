import Header from "@/components/Header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mt-[64px]">{children}</div>
    </>
  );
}

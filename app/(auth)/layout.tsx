import { authOptions } from "@/lib/db/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Note AI",
  description: "Login to Note AI",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/notes");
  return (
    <>
      <main className="flex h-screen">
        <section className="md:flex-1 h-screen md:flex justify-center items-center hidden">
          <div className="relative w-80 h-80 ">
            <Image
              src={"/undraw_taking_notes_re_bnaf.svg"}
              alt="taking notes"
              fill
            ></Image>
          </div>
        </section>
        <section className="flex flex-1 items-center justify-center">
          {children}
        </section>
      </main>
    </>
  );
}

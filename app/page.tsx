import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/db/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/notes");

  return (
    <div className="flex h-screen  items-center">
      <div className="hidden md:block relative h-80 w-80 flex-1 ">
        <Image
          src={"/undraw_add_notes_re_ln36.svg"}
          fill
          alt="Boy with notes"
        ></Image>
      </div>
      <div className="flex-1 flex flex-col items-center gap-2">
        <h2 className="font-bold text-3xl">NOTES AI</h2>
        <Separator className="w-1/2" />
        <p className="italic text-sm">
          Your Intelligent Note-Taking Companion{" "}
        </p>
        <Link href={"/login"} className={`${buttonVariants()} mt-8`}>
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Home;

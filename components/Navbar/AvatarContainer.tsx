import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { authOptions } from "@/lib/db/authOptions";
import { getServerSession } from "next-auth";

const AvatarContainer = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Avatar className="ml-auto">
        <AvatarImage
          src={session?.user.image as string}
          alt={`Profile picture of ${session?.user.name}`}
        />
        <AvatarFallback>{session?.user.name?.slice(0, 1)}</AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarContainer;

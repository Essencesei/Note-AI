"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Loader2, LogOut } from "lucide-react";

const NavMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex gap-2">
      <Button
        className="w-16"
        disabled={isLoading}
        variant={"destructive"}
        onClick={() => {
          setIsLoading(true);
          signOut({ callbackUrl: "/login" });
        }}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
      </Button>
    </div>
  );
};

export default NavMenu;

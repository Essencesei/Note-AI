"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import AddNote from "../AddNote/AddNote";

const NavMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex gap-2">
      <Button
        disabled={isLoading}
        variant={"destructive"}
        onClick={() => {
          setIsLoading(true);
          signOut({ callbackUrl: "/login" });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default NavMenu;

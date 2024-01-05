import React from "react";
import AvatarContainer from "./AvatarContainer";
import NavMenu from "./NavMenu";
import AddNote from "../AddNote/AddNote";
import { ModeToggle } from "../Reusable/ModeToggle";
import { Bot } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <nav className="flex p-4 gap-4 items-center">
        <h1 className="font-extrabold text-xl flex gap-2">
          <Bot />
          <span className="hidden md:block">Note AI </span>
        </h1>
        <ModeToggle />
        <AvatarContainer />
        <AddNote />
        <NavMenu />
      </nav>
    </>
  );
};

export default Navbar;

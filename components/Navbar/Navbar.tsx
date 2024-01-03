import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import AvatarContainer from "./AvatarContainer";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import NavMenu from "./NavMenu";
import AddNote from "../AddNote/AddNote";
import { FaRobot } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <nav className="flex p-4 gap-4 items-center">
        <h1 className="font-extrabold text-xl flex gap-2">
          <FaRobot size={24} />
          <span className="hidden md:block">Note AI</span>
        </h1>
        <AvatarContainer />
        <AddNote />
        <NavMenu />
      </nav>
    </>
  );
};

export default Navbar;

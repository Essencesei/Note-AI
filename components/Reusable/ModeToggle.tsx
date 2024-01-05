"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "../ui/toggle";
import { useState } from "react";

export function ModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const { themes, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Toggle
        onClick={() => {
          setIsDark((prev) => !prev);
          if (isDark) {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      >
        {isDark ? <Sun /> : <Moon />}
      </Toggle>
    </div>
  );
}

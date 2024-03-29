import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/providers/SessionProvider";
import Navbar from "@/components/Navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/db/authOptions";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note AI",
  description: "Your Intelligent Note-Taking Companion",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {session && <Navbar />}

            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

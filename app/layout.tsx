import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  UserButton,
  Show,
} from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HabitFlow",
  description: "A production-grade app to track tasks, habits, and recurring goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ClerkProvider is outermost — above <html> — to eliminate FOUC
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-zinc-950 antialiased`}
        >
          <header className="flex items-center justify-end px-6 py-3 border-b border-zinc-800">
            <Show when="signed-out">
              <SignInButton>
                <button className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-zinc-200 transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

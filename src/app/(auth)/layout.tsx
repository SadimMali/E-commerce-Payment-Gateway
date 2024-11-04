import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <main className="flex items-center justify-center bg-gray-100 min-h-screen relative px-8">
      <div className="absolute left-1 top-12 md:left-4 md:top-4">
        <Link href='/'>
          <Home className="w-8 h-8"/>
        </Link>
      </div>
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md">
        {children}
      </div>
    </main>
  );
}

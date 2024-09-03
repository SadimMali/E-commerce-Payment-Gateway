import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <main className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md">
        {children}
      </div>
    </main>
  );
}

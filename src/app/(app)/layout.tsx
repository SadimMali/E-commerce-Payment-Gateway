import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

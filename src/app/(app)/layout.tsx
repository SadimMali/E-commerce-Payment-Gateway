import { Footer } from "@/components/app-footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <>
      <Navbar />
      {children}
      <MaxWidthWrapper>
      <Footer /> 
      </MaxWidthWrapper>

    </>
  );
}

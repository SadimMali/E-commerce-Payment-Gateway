import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type MaxWidthProps = {
  className?: string;
  children: ReactNode;
};

const MaxWidthWrapper = ({ className, children }: Readonly<MaxWidthProps>) => {
  return (
    <div
      className={cn(
        "h-full w-full px-2.5 md:px-10 lg:px-20 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;

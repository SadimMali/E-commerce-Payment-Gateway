"use client";
import React, { useContext, useEffect, useState } from "react";
import MaxWidthWraper from "./MaxWidthWrapper";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { Cart } from "@/types/Cart.type";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [userCart, setUserCart] = useState<Array<Cart>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const user: User = session?.user;

  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (cartContext && user?.id) {
      const filteredCart = cartContext.cart.filter((c) => c.userId === user.id);
      setUserCart(filteredCart);
    }
  }, [cartContext, user]);

  const quantity = userCart.reduce((acc, element) => {
    return acc + element.quantity;
  }, 0);

  const wish = []; // Replace this with actual wishlist logic
  if (status === "loading") {
    return (
      <nav className="sticky z-20 inset-x-0 w-full top-0 h-14 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWraper>
          <div className="h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold text-base">
              <span>E.com</span>
            </Link>
            <div className="flex items-center justify-between gap-5">
              <div className="flex space-x-5 items-center justify-between h-full">
                <button className="bg-gray-200 w-24 h-8 animate-pulse rounded-md" />
                <button className="bg-gray-200 w-24 h-8 animate-pulse rounded-md" />
              </div>
            </div>
          </div>
        </MaxWidthWraper>
      </nav>
    );
  }

  const navItem = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const categoryComponent: { title: string; path: string }[] = [
    {
      title: "AllClothing",
      path: "/products?category=allclothing",
    },
    {
      title: "sneaker",
      path: "/products?category=sneaker",
    },
    {
      title: "Accessories",
      path: "/products?category=accessories",
    },
    {
      title: "tshirt",
      path: "/products?category=tshirt",
    },
    {
      title: "short",
      path: "/products?category=short",
    },
    {
      title: "backpack",
      path: "/products?category=backpack",
    },
    {
      title: "jacket",
      path: "/products?category=jacket",
    },
  ];

  const MobileNav = () => {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="font-semibold text-xl"
              >
                E.com
              </Link>
            </SheetTitle>
            <SheetDescription>Navigation menu</SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-4">
            <NavMenu />
          </nav>
        </SheetContent>
      </Sheet>
    );
  };

  const NavMenu = () => {
    return (
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col md:flex-row md:items-center gap-2">
          {navItem.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={item.path} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem>
            <NavigationMenuTrigger>Category</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {categoryComponent.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.path}
                    onClick={() => setIsOpen(false)}
                  >
                    {component.title}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  return (
    <nav className="sticky z-20 inset-x-0 w-full top-0 h-14 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWraper>
        <div className="h-14 flex items-center justify-between px-5">
          <div className="flex items-center justify-between gap-5 md:gap-16 text-sm md:txt-lg">
            <div className="flex items-center gap-4">
              <MobileNav />
              <Link href="/" className="font-semibold text-base">
                <span>E.com</span>
              </Link>
            </div>

            <div className="hidden md:block">
              <ul className="flex items-center justify-between gap-5">
                <NavMenu />
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <Link href="/cart">
              <button className="relative">
                <ShoppingCart className="h-6 w-6" />
                {userCart.length > 0 && (
                  <span className="absolute flex items-center justify-center text-xs font-semibold w-4 h-4 p-2 border-2 rounded-full border-red-600 bg-red-600 text-white -right-4 -top-3">
                    {quantity}
                  </span>
                )}
              </button>
            </Link>

            <button className="relative">
              <Heart className="h-6 w-6" />
              {wish.length > 0 && (
                <span className="absolute flex items-center justify-center text-xs font-semibold w-4 h-4 p-2 border-2 rounded-full border-red-600 -right-4 -top-3">
                  {wish.length}
                </span>
              )}
            </button>

            {/* <div className="hidden md:block"> */}
              {user ? (
                <Link href={`/${user.role?.toLocaleString().toLocaleLowerCase()}`}>{user.username || "user"} ✨</Link>
              ) : (
                <div className="flex space-x-5 items-center text-sm lg:text-[1rem] xl:text-base justify-between h-full">
                  <Link href="/sign-up">
                    <button>Sign up</button>
                  </Link>
                  <Link href="/sign-in">
                    <button>Sign in</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        {/* </div> */}
      </MaxWidthWraper>
    </nav>
  );
};

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href = "#", ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} passHref legacyBehavior>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none capitalize">
              {title}
            </div>
          </a>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
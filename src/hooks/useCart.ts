// hooks/useCart.ts
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { useToast } from "@/components/hooks/use-toast";
import { Cart } from "@/types/Cart.type";

export const useCart = () => {
  const cartContext = useContext(CartContext);
  const { toast } = useToast();
  const router = useRouter();

  if (!cartContext) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { cart, setCart } = cartContext;

  const addToCart = (product: Cart, user: any) => {
    if (!user) {
      router.push("/sign-in");
      toast({
        title: "Login required",
        description:
          "You need to log in to add items to your cart. Please sign in.",
        variant: "destructive",
      });
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity if product already exists
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1, userId: user?.id || null }
            : item
        );
      } else {
        // Add new product to cart
        const newCartItem: Cart = {
          ...product,
          quantity: 1,
          userId: user?.id || null,
        };
        return [...prevCart, newCartItem];
      }
    });

    toast({
      title: "Product added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return { cart, addToCart };
};

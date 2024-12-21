import { CartContext } from "@/context/CartContext";
import { Cart } from "@/types/Cart.type";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

interface CartItemProps {
  item: Cart;
  onRemoveCart: (id: string) => void;
}

const CartItemCard: React.FC<CartItemProps> = ({ item, onRemoveCart }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) return;

  const { setCart } = cartContext;

  //change the quantity of the product
  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newQuantity = parseInt(event.target.value, 10);

    setCart((prevCart) => {
      return prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
    });
  };
  return (
    <div className="flex gap-2">
      <div className="w-1/3 md:w-1/4 relative">
        <Image src={item.img} fill className="w-full h-full object-contain" alt="" />
      </div>
      <div className="w-full md:w-2/4 flex-col">
        <span className="block md:hidden font-semibold">&#36;{item.price}</span>
        <h4 className="text-lg font-bold">{item.name}</h4>
        <p className="md:text-md font-semibold text-gray-500">
          {item.subCategory.name}
        </p>
        <p className="text-sm md:text-md font-semibold text-gray-500">
          {item.colorWay}
        </p>

        {/* remove btn */}
        <div className="mt-2 flex gap-2  items-center ">
          <span>Quantity </span>
          <select defaultValue={item.quantity} onChange={handleQuantityChange}>
            {Array.from({ length: 10 }).map((_, ex) => (
              <option key={ex + 1} value={ex + 1}>
                {ex + 1}
              </option>
            ))}
          </select>

          <button onClick={() => onRemoveCart(item.id)}>
            {" "}
            <Trash2 className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />{" "}
          </button>
        </div>
      </div>
      <div className="hidden w-1/4 md:flex justify-end">
        <span className="font-semibold">Rs {item.price}</span>
      </div>
    </div>
  );
};

export default CartItemCard;

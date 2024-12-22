import { Cart } from "@/types/Cart.type";

export function calculatePrice(ch: number, cart: Array<Cart>) {
    // let  totalPrice = tp;
    let charge = ch;
  
    const subTotalPrice = cart.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
  
    if (subTotalPrice > 0 && subTotalPrice < 500) {
      charge = 50;
    }
    let totalPrice = charge + subTotalPrice;
    return {
      subTotalPrice: subTotalPrice,
      charge: charge,
      totalPrice: totalPrice,
    };
  }
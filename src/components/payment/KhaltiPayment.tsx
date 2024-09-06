import { Cart } from "@/context/CartContext";
import axios from "axios"

interface User  {
    name: string;
    email: string;
    phonenumber: string;
}
interface Price {
    totalPrice: number;
    charge: number;
    subTotalPrice: number;
}

interface Props {
    price: Price
    user: User
    cart: Array<Cart>
}


const KhaltiPayment = ({price, user, cart}: Props) => {
    console.log("payemt", price)
    console.log(user)

    const  handleKhaltiPayment = async()=> {
            try {
                const response = await axios.post('/api/epayment', {price: price, user:user , cart:cart})
                console.log("server api",response);
            } catch (err) {
                console.log(err);
            }
    }

  return (
    <div>
      <button onClick={handleKhaltiPayment} className="border-0 block bg-[#5C2D91] text-white py-[5px] px-[14px]">
        Pay with Khalti
      </button>
    </div>
  );
};

export default KhaltiPayment;

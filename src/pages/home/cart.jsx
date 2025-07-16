import { useEffect, useState } from "react";
import { clearCart, loadCart } from "../../utils/cartFunction";
import CardCard from "../../components/cartCard";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [lableTotal, setLableTotal] = useState(0);
  useEffect(() => {
    setCart(loadCart());
    console.log("Cart items:", loadCart());
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderItems: loadCart(),
      })
      .then((res) => {
        console.log("Quote response:", res.data);
        if (res.data.toatal != null) {
          setTotal(res.data.total);
          setLableTotal(res.data.labledTotal);
        }
      });
  }, []);

  function onOrderCheckoutClick() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to checkout");
      return;
    }
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders/",
        {
          orderItems: cart,
          name: "test",
          address: "test",
          phone: 123,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("Order response:", res.data);
      });
  }
  return (
    <div className="bg-gray-100 w-full h-full flex flex-col items-end ">
      <table className="w-full">
        <thead>
          <tr>
            <td>Image</td>
            <td>Product Name</td>
            <td>Product Id</td>
            <td>Qty</td>
            <td>Price</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <CardCard
                key={item.productId}
                productId={item.productId}
                qty={item.qty}
              />
            );
          })}
        </tbody>
      </table>
      <h1 className="text-right text-2xl font-bold">
        Lable Total: LKR.{lableTotal.toFixed(2)}
      </h1>
      <h1 className="text-right text-2xl font-bold">
        Discount:LKR.{lableTotal.toFixed(2) - total.toFixed(2)}
      </h1>
      <h1 className="text-right text-2xl font-bold">
        {" "}
        Total: LKR.{total.toFixed(2)}
      </h1>
      <button
        className="bg-accent hover:bg-light-accent w-[300px]  text-white  p-2 rounded-lg"
        onClick={onOrderCheckoutClick}
      >
        checkout
      </button>
    </div>
  );
}

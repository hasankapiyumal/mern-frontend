import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminProductPage() {
  const [products, setProducts] = useState([
    {
      _id: "686581697ac38066cd7bd1c5",
      productId: "CBC-0001",
      productName: "Wireless Bluetooth Headphones",
      altNames: [
        "Bluetooth Headphones",
        "Wireless Headset",
        "Over-Ear Bluetooth",
      ],
      images: [
        "https://example.com/images/product1.jpg",
        "https://example.com/images/product1-side.jpg",
      ],
      price: 79.99,
      lastPrice: 99.99,
      stock: 25,
      description:
        "High-quality wireless headphones with noise-cancellation and 20-hour battery life.",
      __v: 0,
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  },[]);

  return (
    <div>
      <h1>Admin Product Page</h1>
      {products.map((product, index) => {
        return (
          <div key={index} className="product-card">
            <h1>{product.productName}</h1>
          </div>
        );
      })}
    </div>
  );
}

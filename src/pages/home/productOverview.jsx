import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

export default function ProductOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const productId = params.id;
  useEffect(() => {
    console.log(productId);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log("Product data:", res.data);
        if (res.data == null) {
          setStatus("notfound");
          console.log(status);
        }
        if (res.data != null) {
          setStatus("found");
          setProduct(res.data);
          console.log(status);
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  function onAddtoCartClick() {
    addToCart(product.productId, 1);
    toast.success("Product added to cart");
  }

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      {status == "loading" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className=" animate-spin rounded-full h-32 w-32 border-2 border-gray-500 border-b-accent border-b-4"></div>
        </div>
      )}
      {status == "notfound" && (
        <h1 className="text-2xl text-red-500">Product not found</h1>
      )}
      {status == "found" && (
        <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center">
          <h1 className="text-3xl text-gray-800 lg:hidden">
            {product.productName}
          </h1>
          <p className="text-lg lg:hidden ">
            {product.price > product.lastPrice && (
              <span className="line-through text-red-500">
                LKR.{product.price}
              </span>
            )}{" "}
            <span className="text-lg text-gray-500">
              LKR.{product.lastPrice}
            </span>
          </p>

          <div className="w-[100%] lg:w-[35%] h-full ">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-[65%] h-full p-4">
            <h1 className="text-3xl text-gray-800 hidden lg:block">
              {product.productName}
            </h1>
            <h1 className="text-3xl text-gray-500">
              {product.altNames.join("|")}
            </h1>
            <p className="text-lg text-gray-500">
              Product ID: {product.productId}
            </p>
            <p className="text-lg hidden lg:block">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500">
                  LKR.{product.price}
                </span>
              )}{" "}
              <span className="text-lg text-gray-500">
                LKR.{product.lastPrice}
              </span>
            </p>

            <p className="text-lg text-gray-500">Stock: {product.stock}</p>
            <p className="text-lg text-gray-500">
              Description: {product.description}
            </p>
            <button
              onClick={onAddtoCartClick}
              className="bg-accent text-500 cursor-pointer text-white px-4 py-2 rounded mt-4 hover: transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

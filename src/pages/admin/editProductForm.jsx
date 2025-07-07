import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaFileHandler from "../../utils/mediaUpload";

export default function EditProductForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state.product;

  if(!product) {
    toast.error("No product data found");
    navigate("/admin/products");
  }

  const [productId, setProductId] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [alternativeNames, setAlternativeNames] = useState(
    product.altNames.join(",")
  );
  
  const [price, setPrice] = useState(product.price);
  const [lastPrice, setLastPrice] = useState(product.lastPrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);
  const [imageFiles, setImageFiles] = useState([]);

  async function handleSubmit(e) {
    const promiseArray = [];

    let imageUrls = product.images;
    if (imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        promiseArray[i] = uploadMediaFileHandler(imageFiles[i]);
      }

      imageUrls = await Promise.all(promiseArray)
      
    }
 
    const altnames = alternativeNames.split(",");

    const products = {
      productId: productId,
      productName: productName,
      altNames: altnames,
      images: imageUrls,
      price: price,
      lastPrice: lastPrice,
      stock: stock,
      description: description,
    };

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/products"+product.productId,
        products,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/admin/products");
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  }
  return (
    <div className="w-full h-full bg-red-400 flex justify-center ">
      <h1>Add Product Form</h1>
      <div className="space-y-4 flex flex-col items-center">
        <label>Product ID</label>
        <input disabled
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          type="text"
          className="border border-black w-[300px] h-[30px] rounded-md"
        />
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border border-black w-[300px] h-[30px] rounded-md"
        />
        <label>Alternative Names</label>
        <input
          type="text"
          value={alternativeNames}
          onChange={(e) => setAlternativeNames(e.target.value)}
          className="border border-black w-[300px] h-[30px] rounded-md"
        />
        <label>Image Urls</label>
        <input
          type="file"
          multiple
          onChange={(e) => setImageFiles(e.target.files)}
          className="border border-black w-[300px] h-[30px] rounded-md"
        />
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-black w-[300px] h-[30px] rounded-md"
        />
        <label>last Price</label>
        <input
          type="text"
          value={lastPrice}
          onChange={(e) => setLastPrice(e.target.value)}
          className="border border-black w-[300px] h-[30px] rounded-md"
        />
        <label>Stock</label>
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border border-black w-[300px] h-[30px] rounded-md"
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-black w-[300px] h-[100px] rounded-md"
        ></textarea>
        <button
          className="bg-blue-500 text-white w-[300px] h-[30px] rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Update Product
        </button>
      </div>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProductForm() {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [imageUrls, setImageUrls] = useState("");
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const navigate =useNavigate();

   async function handleSubmit(e) {
      const altnames = alternativeNames.split(",");
      const images = imageUrls.split(",");
      const product ={
        productId: productId,
        productName: productName,
        altnames:altnames,
        images: images,
        price: price,
        lastPrice: lastPrice,
        stock: stock,
        description: description
      }

      const token = localStorage.getItem("token");
try {
    await axios.post("http://localhost:5000/api/products", product, {
        headers:{
            Authorization:"Bearer " + token
        }
    })
    navigate("/admin/products");
    toast.success("Product added successfully");
} catch (error) {
    console.error("Error adding product:", error);
    toast.error("Failed to add product");
}
 
   }
    return(
        <div className="w-full h-full bg-red-400 flex justify-center ">
            <h1>Add Product Form</h1>
            <div className="space-y-4 flex flex-col items-center">
                  <label>Product ID</label>
                  <input value={productId} onChange={(e) => setProductId(e.target.value)} type="text" className="border border-black w-[300px] h-[30px] rounded-md" />
                  <label>Product Name</label>
                  <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="border border-black w-[300px] h-[30px] rounded-md" />
                  <label>Alternative Names</label>
                  <input type="text" value={alternativeNames} onChange={(e) => setAlternativeNames(e.target.value)} className="border border-black w-[300px] h-[30px] rounded-md" />
                  <label>Image Urls</label>
                   <input type="file" multiple  onChange={(e) => setImageUrls(e.target.value)} className="border border-black w-[300px] h-[30px] rounded-md" />
                    <label>Price</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="border border-black w-[300px] h-[30px] rounded-md" />
                    <label>last Price</label>
                    <input type="text" value={lastPrice} onChange={(e) => setLastPrice(e.target.value)} className="border border-black w-[300px] h-[30px] rounded-md" />
                    <label>Stock</label>
                    <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} className="border border-black w-[300px] h-[30px] rounded-md" />
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-black w-[300px] h-[100px] rounded-md"></textarea>
                    <button className="bg-blue-500 text-white w-[300px] h-[30px] rounded-md hover:bg-blue-600" onClick={handleSubmit}>Add Product</button>
                
            </div>
        </div>
    )
}
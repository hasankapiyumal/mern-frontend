import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if(!productsLoaded) {
 axios
      .get(import.meta.env.VITE_BACKEND_URL+"/api/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        setProductsLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
    }
   
  },[productsLoaded]);

  return (

    <div className="relative min-h-screen bg-gray-100 p-6">

      <Link to={"/admin/products/addproduct"} className="absolute right-10 bottom-10 border-blue-600 border-2 p-5 rounded-2xl text-blue-600 text-2xl hover:bg-blue-400"><FaPlus/></Link>
      <h1>Admin Product Page</h1>
      {
        productsLoaded?          <table>
       <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
       </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
              <td>
                <FaTrash onClick={()=>{
                  console.log("Deleting product:", product.productId);
                  const token =localStorage.getItem("token");
                  axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/" + product.productId,{
                    headers: {
                      Authorization: "Bearer " +token
                    }
                  }).then((res)=>{
                    console.log("Product deleted successfully:", res.data);
                    toast.success("Product deleted successfully");
                    setProductsLoaded(false); // Reset to fetch products again

                  }).catch((err)=>{
                    console.error("Error deleting product:", err);
                  });
                }}/>
                <FaPencil/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        :<div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-[60px] h-[60px] rounded-full border-4 border-grey-200 border-b-[#3b82f6] animate-spin"></div>
        </div>

      }
     
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function ProductPage(){
    const[products, setProducts] = useState([]);
    const [loadingStataus, setLoadingStatus] = useState("loading"); //loading //loaded //error
    useEffect(()=>{
        if(loadingStataus=='loading'){
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then((res)=>{
            setProducts(res.data);
            setLoadingStatus("loaded");
            console.log("Products fetched successfully:", res);
        }).catch((error)=>{
            toast.error("Failed to fetch products");
            console.error("Error fetching products:", error);
            setLoadingStatus("error");
        })
    }
    },[])

    return(
        <div className=" bg-gray-100 overflow-y-scroll w-full h-full flex flex-wrap">
           
            {
                products.map((product)=>(
                    <ProductCard product={product}/>
                 
                ))
            }
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react";

export default function CardCard(props){
    const productId=props.productId;
    const qty=props.qty;
    const [product,setProduct] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId).then((res)=>{
              if(res.data!=null){
                setProduct(res.data);
                setLoaded(true);
              }else{
                deleteItem(productId);
              }
            }).catch((err)=>{
                console.error("Error fetching product:", err);
            })
        }
    })

    return(
      <tr className="hover:bg-accent hover:text-white">
      <td><img src={product?.images[0]} alt={product ? product.name : "Product Image"} className="w-[90px] h-[90px] object-cover"/></td>
      <td className="text-center">{productId}</td>
      <td className="text-center">{product?.productName}</td>
      <td className="text-center">{qty}</td>
      <td className="text-center">LKR.{product?.lastPrice}</td>
      <td className="text-center">LKR.{product?.lastPrice*qty}</td>
       

         </tr>
    )
}
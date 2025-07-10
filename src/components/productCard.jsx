import { Link } from "react-router-dom";

export default function ProductCard(props){

    return(
       <Link to={`/productInfo/${props.product.productId}`} >
             <div className="w-[300px] h-[400px] m-[10px] rounded-xl shadow-lg shadow-gray-500 hover:shadow-primary  hover:border-[3px]">
             <img src={props.product.images[0]} alt={props.product.name} className="w-full h-[70%] object-cover overflow-hidden rounded-2xl"/>
             <div className="w-full h-[35%] p-4 flex flex-col">
             <h1 className="text-3xl font-bold text-center">{props.product.productName}</h1> 
             <p className=" text-left text-xl font-semibold">LKR.{props.product.lastPrice.toFixed(2)}</p>
             {
                (props.product.lastPrice < props.product.price)&&
             <p className=" text-left text-xl font-semibold line-through text-gray-500">LKR.{props.product.price.toFixed(2)}</p>
             }
             </div>
             </div>
           </Link>
    );
}
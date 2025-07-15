import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import NavSlider from "./navSlider";

export default function Header() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    return(
        <>
        {isSliderOpen&&<NavSlider closeSlider={()=>{setIsSliderOpen(false)}}/>}
        <header className="bg-white w-full h-[100px] relative flex items-center justify-center">
            <img src="/vite.svg" alt="Vite logo" className="absolute left-[10px]  cursor-pointer h-full" />
            <RxHamburgerMenu onClick={()=>{setIsSliderOpen(true)}} className="absolute right-[10px] cursor-pointer h-full lg:hidden text-accent"/>
               <div className="h-full  items-center w-[500px] justify-between hidden lg:flex">
                <Link to="/" className="text-accent text-xl hover:border-b border-b-accent">Home</Link>
                <Link to="/products" className="text-accent text-xl hover:border-b border-b-accent">Products</Link>
                <Link to="/about" className="text-accent text-xl hover:border-b border-b-accent">About Us</Link>
                <Link to="/contact" className="text-accent text-xl hover:border-b border-b-accent">Contact Us</Link>
                <Link to="/cart" className="text-accent text-xl hover:border-b border-b-accent">Cart</Link>
               </div>
                
        </header>
        </>
    )
}
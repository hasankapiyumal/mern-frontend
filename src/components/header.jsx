import { Link } from "react-router-dom";

export default function Header() {
    return(
        <header className="bg-white w-full h-[100px] relative flex items-center justify-center">
            <img src="/vite.svg" alt="Vite logo" className="absolute left-[10px]  cursor-pointer h-full" />
               <div className="h-full flex items-center w-[500px] justify-between">
                <Link to="/" className="text-accent text-xl hover:border-b border-b-accent">Home</Link>
                <Link to="/products" className="text-accent text-xl hover:border-b border-b-accent">Products</Link>
                <Link to="/about" className="text-accent text-xl hover:border-b border-b-accent">About Us</Link>
                <Link to="/contact" className="text-accent text-xl hover:border-b border-b-accent">Contact Us</Link>
                <Link to="/cart" className="text-accent text-xl hover:border-b border-b-accent">Cart</Link>
               </div>
                
        </header>
    )
}
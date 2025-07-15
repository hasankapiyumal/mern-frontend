import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NavSlider(props) {
    const closeSlider=props.closeSlider;
  return (
    <div className="fixed w-full h-screen bg-[#00000080] z-[10] lg:hidden">
      <div className="bg-white w-[400px] h-[100px] relative flex items-center justify-center">
        <img
          src="/vite.svg"
          alt="Vite logo"
          className="absolute left-[10px]  cursor-pointer h-full"
        />
        <IoMdClose onClick={closeSlider} className="absolute right-[10px] cursor-pointer h-full bg-accent"/>
      </div>
      <div className="bg-white w-[300px] h-full flex flex-col">
        <Link
          to="/"
          className="text-accent text-xl hover:border-b border-b-accent"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-accent text-xl hover:border-b border-b-accent"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="text-accent text-xl hover:border-b border-b-accent"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="text-accent text-xl hover:border-b border-b-accent"
        >
          Contact Us
        </Link>
        <Link
          to="/cart"
          className="text-accent text-xl hover:border-b border-b-accent"
        >
          Cart
        </Link>
      </div>
    </div>
  );
}

import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AddProductForm from "./admin/addProductForm";

export default function AdminHomePage() {
  return (
    <div className="bg-blue-300 h-full h-screen flex ">
      <div className="bg-red-200 w-[20%] h-screen flex flex-col items-center">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
      </div>
      <div className="bg-blue-200 w-[80%] h-screen flex">
       <Routes path="/*">
        <Route path='/dashboard' element={<h1>Dashboard</h1>}/>
        <Route path='/products' element={<AdminProductPage/>}/>
        <Route path='/products/addproduct' element={<AddProductForm/>}/>
        <Route path='/orders' element={<h1>Orders</h1>}/>
       </Routes>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import Header from "../components/header";

export default function  HomePage() {
    return (
        <div className="h-screen w-full">
            <Header/>
            <h1>Home Page</h1>
           <Link to="/login">Login</Link>
        </div>
    );
}
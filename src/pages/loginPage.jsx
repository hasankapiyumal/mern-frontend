import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="w-[359px] h-[359px] border border-black relative">
      <div className="w-36 h-36 bg-blue-600 border absolute right-5 bottom-5 ">
        
      </div>
      <div className="w-36 h-36 bg-yellow-600 fixed right-5 bottom-5"></div>
      <Link to="/">Home</Link>
    </div>
  );
}

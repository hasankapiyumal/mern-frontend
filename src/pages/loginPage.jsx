import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function login() {
    axios.post('http://localhost:5000/api/users/login',{
      email :email,
      password : password
    }).then((res)=>{
      if(res.data.user == null) {
        toast.error(res.data.message);
        return;
      }

      console.log(res);
     localStorage.setItem("token",res.data.token);
     if(res.data.user.type === "admin") {
      toast.success("Welcome Admin");
       window.location.href = "/admin";
     }else{
      toast.success("Welcome User");
        window.location.href = "/";
     }
    })
  }

  return (
   <div className="w-full h-screen flex bg-red-600 justify-center items-center">
     <div className="bg-blue-400 w-[450px] h-[450px] flex flex-col justify-center items-center">
       <img src="/bird_logo.svg" alt="" className="rounded-full w-[100px]" />
       <span>Email</span>
       <input type="text" className="border border-black" defaultValue={email} onChange={(e)=>{
        
        setEmail(e.target.value);
       }}/>

       <span>Password</span>
       <input type="password" className="border border-black" defaultValue={password} onChange={(e)=>{
        setPassword(e.target.value);
       }}/>
       <button className="bg-white" onClick={login}>Login</button>
     </div>
   </div>
  );
}

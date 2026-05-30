"use client"
import {useState} from "react"  

export default function Sidebar (){
    const [item,setItem] = useState("Dashboard");
    

    const handleLogOut = async()=>{
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        window.location.href = "/admin/login"
    }
    return(
        <section className="bg-[#2A1505] w-100 ">
            <div className="px-10 py-10">
                <h1 className="text-3xl text-amber-400">🍳 Foody Admin</h1>
            </div>
            
            <hr className=" opacity-10 w-full" />
            <div className=" flex flex-col gap-1 justify-between ">
                <div>
                    <h1 className="text-xl px-10 pt-10 text-gray-300">Overview</h1>
                <ul className="list-disc list-inside marker:text-4xl  w-full px-10 hover:bg-[rgba(57,57,57,0.8)] hover:cursor-pointer active:bg-[rgba(57,57,57,0.6)] ">
                    <li className="flex items-center gap-3 py-4 ">
                        <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                        <span className="text-xl ">Dashboard</span>
                    </li>
                    </ul>
                </div>
                
                <div>
                    <h1 className="text-xl opacity-80 px-10">Account</h1>
                <ul className="list-disc list-inside marker:text-4xl">
                    <li className="flex items-center gap-3 py-4 px-10 hover:bg-[rgba(57,57,57,0.8)] hover:cursor-pointer active:bg-[rgba(57,57,57,0.6)] " onClick={handleLogOut}>
                        <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                        <span className="text-xl">Logout</span>
                    </li>
                </ul>   
                </div>
                
            </div>
        </section>
    );
}
"use client"
import Link from 'next/link'
import homeCss from '../app/homeCss.module.css';
import { useState,useEffect } from "react";
import { useParams } from "next/navigation";


export default function UserNavbar() {
  const [selected, setSelected] = useState("👤");
  const [open, setOpen] = useState(false);
  const [nameh, setName] = useState<string | null>(null);  
  const params = useParams();
  const name = params.name
    useEffect(() => {
    if (name) {
      localStorage.setItem("name", name as string);
      setName(name as string); 
    } else {
      const stored = localStorage.getItem("name");
      setName(stored); 
    }
  }, [name]);
  const options = ["Mykitchen", "LogOut"];
  

      const handleOption = async (option: string) => {
        
        if (option === "LogOut") {
          await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
          window.location.href = "/login"
          localStorage.clear()
        } else if (option === "Mykitchen") {
          const stored = localStorage.getItem("name");
          window.location.href = `http://localhost:3000/${stored}/mykitchen`;
        }
        setSelected(option);
        setOpen(false);
      };

  return (
    <div className={`flex justify-between h-20 items-center w-full px-4 md:px-10 ${homeCss.navbar}`}>

      <div className="flex text-2xl shrink-0">
        <h1>Foody</h1>
      </div>

      <div className={`${homeCss.navbarLinks} hidden md:flex gap-4 justify-center items-center`}>
        <Link href={`/${nameh}`} className="flex justify-center items-center w-24 h-10 text-xl hover:bg-amber-100 hover:text-emerald-700 rounded-lg">
          Home
        </Link>
        <Link href="/Recipes?cat=all" className="flex justify-center items-center w-24 h-10 text-xl hover:bg-amber-100 hover:text-emerald-700 rounded-lg">
          Recipes
        </Link>
        <Link href="/about" className="flex justify-center items-center w-24 h-10 text-xl hover:bg-amber-100 hover:text-emerald-700 rounded-lg">
          About us
        </Link>
      </div>

      <div
        className="relative w-40 flex justify-center "
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <span className="px-4 py-2 text-black bg-amber-200 w-full flex justify-center rounded-md cursor-pointer">
          {selected}
        </span>

        {open && (
          <ul className="absolute top-full left-0 right-0 bg-white border text-black border-gray-200 rounded-md shadow z-10 m-0 p-0 list-none">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOption(option)}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-amber-100"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
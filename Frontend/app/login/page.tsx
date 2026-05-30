"use client"

import {Icon} from '../../components/Icon';
import Link from 'next/link'
import { useState,useRef } from 'react';


function Login(){

  
  const username = useRef<HTMLInputElement|null>(null);
  const password = useRef<HTMLInputElement|null>(null);
  const [loading, setLoading] = useState(false);
  const [valid,setValid] = useState (false)

  const handleClick = (e: React.FormEvent)=>{
      e.preventDefault()
      const payload = {
      "username" : username.current?.value,
      "password" : password.current?.value
      }
       
      postData(payload)
  }

      const postData = async(payload : object) =>{
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const req = await fetch("/api/auth/login",{
          method : "POST" ,
          headers : {
            "Content-Type": "application/json"
          },
          body : JSON.stringify(payload),
        })
        setLoading(false);
        const res = await req.json();
        
        if (res.message === "login avec succees"){
          const name = res.username
          window.location.href = `/${name}`
          
          
        }
         else {
            setValid(true); 
          }
        
      }

      
  return (
    <div className="flex flex-col md:flex-row h-screen w-full ">
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-4xl font-bold text-slate-800 mb-8 text-center md:text-left">Login</h2>
          
          <form className="space-y-4" onSubmit={handleClick}>
            <label className="block text-lg text-gray-700 mb-1 font-bold ">Username</label>
            <input type="text" placeholder="enter your username" className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-black" onChange={() => setValid(false)} ref={username}  />
            <label className="block text-lg text-gray-700 mb-1 font-bold ">Password</label>
      <input type="text" placeholder="enter your password" className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-black" onChange={() => setValid(false)} ref={password}  />
            { valid ? <div className='text-red-500 font-bold text-xl'>Invalid username or password.</div> : <div></div>}
            
            <div className="text-right">
               <a href='#' className='text-sm text-slate-500 hover:text-[#008645] transition-colors'>Forget password?</a>
            </div>

            <button disabled={loading} type="submit"  className="w-full bg-[#008645] hover:bg-opacity-90 text-white font-semibold py-4 rounded-2xl transition-all shadow-sm" >
              {loading ? "Loading..." : "Login"}
            </button>

            <div className="relative flex items-center py-4">
                <div className="grow border-t border-slate-200"></div>
                <span className="shrink mx-4 text-slate-400 text-sm">or</span>
                <div className="grow border-t border-slate-200"></div>
            </div>
            <div className='flex justify-center gap-4'>
            <Icon iconimg="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
            <Icon iconimg="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" />
            </div>
            <p className="text-slate-500 mt-6 text-center">
              Don't have an account?{" "}
              <Link 
                href="/signup" 
                className="text-[#008645] font-semibold hover:underline transition-all"
              >
                Sign up
              </Link>
            </p>
          </form>

        </div>
      </div>

      <div className="hidden md:block md:w-1/2 h-full">
        <img 
          src="/images/imagev.png" 
          alt="Fresh Greens" 
          className="w-full h-full object-cover" 
        />
      </div>

    </div>
  );
}

export default Login;
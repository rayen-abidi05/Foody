"use client";
import Image from "next/image";
import homeCss from "./homeCss.module.css";
import Footer from "../components/Footer";
import Link from 'next/link'

import { useEffect, useRef } from "react";

function Main() {
  return (
    <div className={homeCss.section}>
      
    <div className=" text-7xl w-full h-full flex justify-center mb-30 mt-20 max-[720px]:mt-20 max-[720px]:flex-col ">
      <div className="flex justify-center items-center ">
        <div className="mb-30 ml-20">
          <h1 className="mb-5">Welcome to <span className="text-amber-300">Foody</span></h1>
          <h1 className="flex text-4xl mt-3 mb-3">Cooking made fun and easy</h1>
          <h1 className="flex mt-3 mb-3 text-4xl">Unleash your Inner Chef</h1>
          <p className="flex text-lg mt-3 mb-3 ">Explore handcrafted recipes, track your nutrition, and share your culinary creations with the world.</p>
          <div className="flex w-full ">
            <div  className="flex justify-center items-center mt-4 h-15 w-[50%] bg-amber-300 text-white rounded-lg text-xl font-bold cursor-pointer hover:bg-white hover:text-amber-300 transition duration-300">
              Get started
            </div>
          </div>
        </div>
       
      </div>
      <div className={` flex w-full h-full justify-center items-center  ${homeCss.myimage} `}>
        <Image 
          src="/images/spa.png" 
          alt="Foody Logo" 
          width={900} 
          height={900}
          style={{ background: 'transparent' }}
          
        />
      </div>
      
    </div>
    </div>
  );
}

function Discover() {
  return (
    <div className={homeCss.section}>
  <div className="flex over flex-col w-full justify-content items-center p-3 max-[720px]:ml-30 ">
    
    <div className="flex flex-col items-center gap-4 w-full md:flex">
      
      <h1 className="text-7xl text-center text-amber-200">Unforgettable</h1>
      <h1 className="text-7xl text-center text-amber-300">Cooking Experience</h1>

      <div className="flex justify-center w-full">
        <p className="text-lg text-center max-w-2xl ">
          Whether you're just starting out or already love cooking, Foody helps you explore new flavors and create delicious meals that bring people together.
        </p>
      </div>

    </div>

    <div className={`${homeCss.scrollbar}  mt-30 h-112.5  `}>
      <div className={homeCss.group}>
        
        <Image 
          src="/images/ma9rouna.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={homeCss.scrollimage}
        />
        <Image 
          src="/images/lazania.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={homeCss.scrollimage}
        />
        <Image 
          src="/images/rice.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={homeCss.scrollimage}
        />
         <Image 
          src="/images/salad.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={homeCss.scrollimage}
        />
        <Image 
          src="/images/sando.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={`${homeCss.scrollimage}`}
        />
        <Image 
          src="/images/butterchiken.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={`${homeCss.scrollimage}`}
        />
         <Image 
          src="/images/brikf.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={`${homeCss.scrollimage}`}
        />
        
      </div>
      <div className={homeCss.group}>
        
        <Image 
          src="/images/ma9rouna.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={homeCss.scrollimage}
        />
        <Image 
          src="/images/lazania.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={homeCss.scrollimage}
        />
        <Image 
          src="/images/rice.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={homeCss.scrollimage}
        />
         <Image 
          src="/images/salad.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={homeCss.scrollimage}
        />
        <Image 
          src="/images/sando.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={`${homeCss.scrollimage}`}
        />
        <Image 
          src="/images/butterchiken.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={`${homeCss.scrollimage}`}
        />
         <Image 
          src="/images/brikf.jpg" 
          alt="Discover Foody" 
          width={450} 
          height={450}
          className={`${homeCss.scrollimage}`}
        />
        
      </div>
    </div>

  </div>
  </div>
      );
}


function Category() {
  return (
    <div className={homeCss.section}>
    <div className="flex flex-col items-center p-3 max-[720px]:ml-30 max-[720px]:mt-10 ">
      <div className="flex w-full flex-col justify-center items-center gap-4">
        <h1 className="text-6xl">What are you craving?</h1>
        <p className="text-2xl font-bold opacity-50">From clean eating to comfort food — we've got both covered.</p>
      </div>
      <div className="flex gap-4 max-[720px]:flex-col mt-10" >
        <Link href="/Recipes?cat=healthy">
        <div className={`flex justify-center items-center p-7 flex-col max-w-125 h-175 border border-green-700/30 rounded-4xl bg-emerald-800 hover:-translate-y-4 duration-500 cursor-pointer ${homeCss.cardh} relative`}>
        <div className={homeCss.content}>
          <div className="flex mb-6 gap-5 w-full text-5xl">
            🥗
          </div>
          <div className="flex gap-5 w-full mb-5 ">
            <h1 className="flex justify-center items-center text-xl bg-emerald-800 text-emerald-100 rounded-4xl w-30 border-emerald-100 border-1">HEALTHY</h1>
          </div>
          <div className="flex flex-col gap-2 mb-5 w-full">
            <h1 className="font-serif text-4xl">Clean & nutritious</h1>
            <p className="text-lg opacity-30">Low-calorie, high-protein meals packed with vitamins. Perfect for your wellness goals.</p>
          </div>
          <div className="flex gap-5 w-full mb-10">
            <div>
              <h1 className="text-2xl  text-green-400">94</h1>
              <p className="text-lg opacity-70">Recipes</p>
            </div>
            <div>
              <h1 className="text-2xl  text-green-400">~320</h1>
              <p className="text-lg opacity-70">Avg kcal</p>
            </div>
            <div>
              <h1 className="text-2xl  text-green-400">18 min</h1>
              <p className="text-lg opacity-70">Avg prep</p>
            </div>
          </div>
          <div className="flex gap-5 w-full ml-1">
            <button className="bg-emerald-800 text-emerald-100 border-1 border-white hover:bg-emerald-700 text-lg font-bold w-[200px] py-2 px-4 rounded-2xl">
              Explore healthy →
            </button>
          </div>
          </div>
        </div>
        </Link>
        <Link href="/Recipes?cat=normal">
        <div className={`flex justify-center items-center p-7 flex-col max-w-[500px] h-[700px] border border-amber-700/30 rounded-4xl bg-amber-200 hover:-translate-y-4 duration-500 cursor-pointer ${homeCss.cardn } relative`}>
          <div className={homeCss.content}>
          <div className="flex mb-6 gap-5 w-full text-5xl">
            🍝
          </div>
          <div className="flex gap-5 w-full mb-5 ">
            <h1 className="flex justify-center items-center text-xl bg-amber-800 text-emerald-100 rounded-4xl w-30 border-emerald-100 border-1 font-serif ">NORMAL</h1>
          </div>
          <div className="flex flex-col gap-2 mb-5 w-full">
            <h1 className="text-4xl font-serif">Comfort & indulgent</h1>
            <p className="text-lg opacity-30">Classic hearty dishes full of flavor. Because sometimes you just deserve a treat.</p>
          </div>
          <div className="flex gap-5 w-full mb-10">
            <div>
              <h1 className="text-2xl text-amber-500">146</h1>
              <p className="text-lg opacity-70">Recipes</p>
            </div>
            <div>
              <h1 className="text-2xl text-amber-500 ">~680</h1>
              <p className="text-lg opacity-70">Avg kcal</p>
            </div>
            <div>
              <h1 className="text-2xl text-amber-500">35  min</h1>
              <p className="text-lg opacity-70">Avg prep</p>
            </div>
          </div>
          <div className="flex gap-5 w-full ml-1">
            <button className="bg-amber-800 text-emerald-100 border-1 border-white hover:bg-amber-900 text-lg font-bold py-2 px-4 w-[200px] rounded-2xl">
              Explore normal →
            </button>
          </div>
          </div>
        </div>
        </Link>
      </div>
    </div>
    </div>
  );
}



export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            homeCss.animate,
            entry.isIntersecting
          );
        });
      },
      { threshold: 0.2 }
    );

    const sections =
      containerRef.current?.querySelectorAll(`.${homeCss.section}`);

    sections?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <> 
      
      <main ref={containerRef} className={homeCss.section_main}>
        <Main />
        <Discover />
        <Category />
      </main>
      <Footer />
    </>
  );
}

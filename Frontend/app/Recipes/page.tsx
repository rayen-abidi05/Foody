"use client";
import Link from "next/link"
import Image from "next/image";
import {useState,useEffect} from "react"
import {getData} from "@/lib/getData"
import {Card} from '@/app/[name]/mykitchen/page'
import {useSearchParams} from 'next/navigation'


export default function Mine( ){
        const searchParams = useSearchParams();
        const categ = searchParams.get('cat')
        const [count,setCount] = useState(1);
        
        const [liste_recipe,setListe] = useState([]);
        const [liste_recipe1,setListe1] = useState([]);
        const [category,setCategory] = useState(categ);
        const [searchQuery,setSearchQuery] = useState("");
       
      
       const fetching = async (cat : string)=>{
           try{
               let data = await getData('/api/recipe/public',cat);
               if (count === 1) {
                   setListe1(data.recipes);
                   setCount(count+1);
               }
               setListe(data.recipes);
               console.log(liste_recipe)
           }
           catch (err){
               if (err instanceof Error) {
                   console.error("Error:", err.message);
               } else {
                   console.error("Unknown error:", err);
               }
           }
       }
           
           useEffect(() => {
               fetching(category);
           }, [category]);
       
           const count_a = liste_recipe1.length;
           const count_h = liste_recipe1.filter((item) => item.category.toLowerCase() === 'healthy').length;
           const count_n = liste_recipe1.filter((item) => item.category.toLowerCase() === 'normal').length;

           const filtered_recipes = liste_recipe.filter((item) =>
               item.title.toLowerCase().includes(searchQuery.toLowerCase())
           );
    
    return (
        <div className="w-full h-screen flex flex-col pl-40 pr-40 mt-25 gap-5">
            <div className="flex">
                <h1 className="text-2xl opacity-80">Welcome back 👋</h1>
            </div>
            <div className="flex justify-between">
                <h1 className="text-5xl"> <span className="text-[#EF9F27]">{category} Recipes</span></h1>

            </div>
            <div className="grid grid-cols-3 gap-4 w-full">
                <div className="flex flex-col gap-1 bg-[#532a0b] pl-5 pt-5 pb-5 border rounded-xl border-[rgb(244,164,43,0.6)]">
                    <h1 className="text-[#EF9F27] text-4xl">{count_a}</h1>
                    <p className="text-2xl">Total recipes</p>
                </div>
               <div className="flex flex-col gap-1 bg-[#532a0b] pl-5 pt-5 pb-5 border rounded-xl border-[rgb(244,164,43,0.6)]">
                    <h1 className="text-[#EF9F27] text-4xl">{count_h}</h1>
                    <p className="text-2xl">Healthy</p>
                </div>
                <div className="flex flex-col gap-1 bg-[#532a0b] pl-5 pt-5 pb-5 border rounded-xl border-[rgb(244,164,43,0.6)]">
                    <h1 className="text-[#EF9F27] text-4xl">{count_n}</h1>
                    <p className="text-2xl">Normal</p>
                </div>
            </div>
            <div className="w-full p-10 bg-[#5e2c07] rounded-4xl flex flex-col gap-5">
                <div className="w-full flex p-5 gap-4 items-center rounded-xl bg-[rgba(200,200,200,0.1)] border border-gray-500">
                    <h1 className="text-2xl">🔍</h1>
                    <input
                        type="text"
                        placeholder="Search your recipes.."
                        className="w-full text-white pl-5 pt-2 pb-2 text-xl bg-mist-600 rounded-xl focus:outline-blue-400/80 focus:shadow-[0px_0px_7px_rgba(255,255,255,1)] focus focus:outline-3"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex h-full items-center gap-3">
                        <div className="w-2 h-full bg-[#EF9F27]"></div>
                        <h1 className="text-3xl">My Recipes</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex justify-center items-center p-3 pr-5 pl-5 text-xl border border-gray-500 rounded-xl active:bg-gray-800 hover:bg-gray-800" onClick={() => setCategory("All")}>
                            All
                        </button>
                        <button className="flex justify-center items-center p-3 pr-5 pl-5 text-xl border border-gray-500 rounded-xl active:bg-gray-800 hover:bg-gray-800" onClick={() => setCategory("Healthy")}>
                            Healthy
                        </button>
                        <button className="flex justify-center items-center p-3 pr-5 pl-5 text-xl border border-gray-500 rounded-xl active:bg-gray-800 hover:bg-gray-800" onClick={() => setCategory("Normal")}>
                            Normal
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    {filtered_recipes?.length > 0 && filtered_recipes.map((item, index) => (
                        <Card
                            key={item.title}
                            title={item.title}
                            info={item.brief_description}
                            duration={item.preparation_time}
                            difficulty={item.difficulty}
                            serving={item.serving}
                            imageurl={item.imageurl}
                            categorie={item.category}
                            nogestion = {true}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
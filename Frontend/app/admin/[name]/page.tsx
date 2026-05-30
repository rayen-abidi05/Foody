"use client";
import Sidebar from '@/components/Sidebar'
import {Card} from '@/app/[name]/mykitchen/page'
import Image from "next/image";
import {useState,useEffect,useRef} from "react"
import {getData} from "@/lib/getData"
import {getID} from "@/lib/getID"

import { notFound } from "next/navigation";
import Link from 'next/link'
import { useParams,useRouter} from "next/navigation";


function Content() {
    const params = useParams();
    const [count,setCount] = useState(1);
     const router = useRouter();
     const [liste_recipe,setListe] = useState([]);
     const [liste_recipe1,setListe1] = useState([]);
     const [category,setCategory] = useState('All');
     const [searchQuery,setSearchQuery] = useState("");
     const name = params.name;
     const [stored, setStored] = useState<string>("");

    useEffect(() => {
            if (name) {
                localStorage.setItem("name", name as string);
                setStored(name as string);
            }
        }, [name]);
   


    const checkingrole = async () => {
        try {
            const res = await fetch("/api/auth/role", { method : "GET", credentials: "include" });
            if (!res.ok) {
                router.replace("/not-authorized");
                return;
            }
        } catch {
            router.replace("/not-authorized");
            console.log("le le y cheater");
        }
     }
    const fetching = async (cat : string)=>{
        try{
            let data = await getData('/api/recipe/admin/dashboard',cat);
            if (data.status === 401) {
            const refreshRes = await fetch("/api/auth/refresh", {
                method: "POST",
                credentials: "include", 
            });

            if (!refreshRes.ok) {
                console.error("Session expired.");

                return;
            }

            
            data = await getData('/api/recipe/client/myKitchen',cat);
            }
            if (count === 1) {
                setListe1(data.recipes);
                setCount(count+1);
            }
            setListe(data.recipes);
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
            const init = async () => {
                await checkingrole();
            }
            init();
            
        }, []);
        
        useEffect(() => {
            fetching(category);
        }, [category]);
    
        const handleLocalDelete = (title: string) => {
            console.log("removing from list:", title);
            setListe(prev => prev.filter((item) => item.title !== title));
        }
        if(liste_recipe1){
            
        }
        const count_a = liste_recipe1.length;
        const count_h = liste_recipe1.filter((item) => item.category.toLowerCase() === 'healthy').length;
        const count_n = liste_recipe1.filter((item) => item.category.toLowerCase() === 'normal').length;

        const filtered_recipes = liste_recipe.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return(
        <div className='w-full  flex flex-col gap-4 '>
            <div className='flex justify-between w-full bg-[#311704] px-10 py-6.5'>
                <div>
                    <h1 className='text-3xl'>Dashboard</h1> 
                    <h1 className='text-xl opacity-60'>Welcome back, Admin</h1> 
                </div>
                
                
            </div>
            <div className='flex flex-col w-full px-5'>
                <div className='w-full flex px-10 gap-6'>
                    <div className='w-1/3 bg-[linear-gradient(to_right,#311704,#391704)] flex flex-col items-center rounded-2xl py-10'>
                        <h1 className='text-5xl text-amber-400'>{count_a}</h1>
                        <p className='opacity-60 mt-1'>Total recipes</p>
                        <p className='text-green-600 flex items-center gap-3'>↑ +12 this week<span className='text-3xl'>🍽️  </span></p>
                    </div>
                    <div className='w-1/3 bg-[linear-gradient(to_right,#311704,#392707)] flex  flex-col items-center rounded-2xl py-10'>
                        <h1 className='text-5xl text-amber-400'>{count_h}</h1>
                        <p className='opacity-60 mt-1'>Healthy recipes</p>
                        <p className='text-green-600 flex items-center gap-3'>↑ 54% of total<span className='text-3xl'>🥗</span></p>
                    </div>
                    <div className='w-1/3 bg-[linear-gradient(to_right,#311704,#491709)] flex flex-col items-center rounded-2xl py-10'>
                        <h1 className='text-5xl text-amber-400'>{count_n}</h1>
                        <p className='opacity-60 mt-1'>Healthy recipes</p>
                        <p className='text-green-600 flex items-center gap-3'>↓ 46% of total<span className='text-3xl'>🍖</span></p>
                    </div>
                    
                </div>
                <div className='w-full flex flex-col px-10 bg-[#311704] rounded-4xl mt-5 py-5'>
                    <div className='w-full p-4 flex justify-between'>
                        <h1 className='h-fit flex gap-1 text-4xl items-center'><span className='h-full text-2xl bg-amber-400 text-amber-400'> a</span>All Recipes</h1>
                        <div className='flex gap-2'>
                            <div className="flex items-center gap-2 px-4 border border-gray-500 rounded-xl bg-[rgba(200,200,200,0.1)]">
                                <h1 className="text-xl">🔍</h1>
                                <input
                                    type="text"
                                    placeholder="Search recipes.."
                                    className="text-white py-3 text-xl bg-transparent focus:outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="flex justify-center items-center p-3 pr-5 pl-5 text-xl border border-gray-500 rounded-xl active:bg-gray-800 hover:bg-gray-800" onClick={() => setCategory("All")}>
                                All
                            </button>
                            <button className="flex justify-center items-center p-3 pr-5 pl-5 text-xl border border-gray-500 rounded-xl active:bg-gray-800 hover:bg-gray-800" onClick={() => setCategory("Healthy")}>
                                Healthy
                            </button>
                            <button className="flex justify-center items-center p-3 pr-5 pl-5 text-xl border border-gray-500 rounded-xl active:bg-gray-800 hover:bg-gray-800" onClick={() => setCategory("Normal")}>
                                Normal
                            </button>
                            <Link href={`/admin/${stored}/add`}> 
                            <button className='flex justify-center items-center py-3 px-7  text-xl border border-gray-500 rounded-xl active:bg-gray-700 hover:bg-gray-800'>
                                + Add Recipe
                            </button>
                            </Link>
                        </div>
                        
                    </div>
                   
                <div className="grid grid-cols-3 gap-5 ">
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
                            nogestion = {false}
                            onDelete={() => handleLocalDelete(item.title)}
                        />
                    ))}
                    <div className="flex flex-col rounded-4xl shadow-lg bg-[rgba(200,200,200,0.1)] h-150">
                        <div className="w-full h-full rounded-4xl flex flex-col justify-center items-center gap-3 border-[rgb(244,151,11,0.6)] border-dotted border-4">
                            <Link href="mykitchen/add">
                            <div className="hover:bg-[#8d5400] hover:border-[rgb(244,151,11,1)] w-32 h-32 text-[#EF9F27] rounded-full border-2 border-dotted border-[rgb(244,151,11,0.6)] flex justify-center items-center text-6xl cursor-pointer">+</div>
                            </Link>
                            <h1 className="text-2xl">Add new recipe</h1>
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </div>

        
    );
}


export default function Main() {
    return (
        <div className="flex">
            <Sidebar />
            <Content /> 
        </div>
    );
}
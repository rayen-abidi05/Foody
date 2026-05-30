"use client"

import { Upload } from 'lucide-react';
import { useState, useRef, useEffect } from "react";


function Add() {
  
  const [fileName, setFileName] = useState<string>("");
  const brief_description = useRef<HTMLTextAreaElement>(null);
  const [isAdded, setisAdded] = useState<0|1|2>(0);
  const category = useRef<HTMLSelectElement>(null);
  const recipe_name = useRef<HTMLInputElement>(null);
  const difficulty = useRef<HTMLSelectElement>(null);
  const serving = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const Prep = useRef<HTMLTextAreaElement>(null);
  const Cooking = useRef<HTMLTextAreaElement>(null);
  const Garnish = useRef<HTMLTextAreaElement>(null);
  const cookingTime = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "", unit: "" }]);

  const [suggestions, setSuggestions] = useState<{id: number, name: string}[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);

useEffect(() => {
  if (isAdded === 1) {
    
    brief_description.current  && (brief_description.current.value  = "");
    category.current           && (category.current.value           = "");
    recipe_name.current        && (recipe_name.current.value        = "");
    difficulty.current         && (difficulty.current.value         = "");
    Prep.current               && (Prep.current.value               = "");
    Cooking.current            && (Cooking.current.value            = "");
    serving.current            && (serving.current.value            = "");
    Garnish.current            && (Garnish.current.value            = "");
    cookingTime.current        && (cookingTime.current.value        = "");
    brief_description.current  && (brief_description.current.value  = "");
    setIngredients([{ name: "", quantity: "", unit: "" }])
    setFileName("");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
      });
  }
}, [isAdded]);

  async function handleIngredientNameChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const search = e.target.value;
    updateIngredient(index, "name", search);
    setActiveIngredientIndex(index);

    if (!search.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(`/api/recipe/ingredients/search?search=${encodeURIComponent(search)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const text = await res.text();

      if (!text) {
        setSuggestions([]);
        return;
      }

      const data = JSON.parse(text);
      setSuggestions(data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
    }
  }

  function selectIngredient(name: string) {
    if (activeIngredientIndex === null) return;
    updateIngredient(activeIngredientIndex, "name", name);
    setSuggestions([]);
    setShowDropdown(false);
    setActiveIngredientIndex(null);
  }

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("handleSubmit called");
  const file = image.current?.files?.[0];
  
  if (
    !file ||
    !ingredients ||
    !category.current ||
    !recipe_name.current ||
    !difficulty.current ||
    !serving.current ||
    !Prep.current ||
    !Garnish.current ||
    !Cooking.current ||
    !cookingTime.current ||
    !brief_description.current
  ) {
    setisAdded(2);
    
    window.scrollTo({
      top: 0,
      behavior: "smooth"
      });
    return;
  }

  
  const formData = new FormData();
  formData.append("image", file);
  formData.append("ingredients", JSON.stringify(ingredients));
  formData.append("category", category.current.value);
  formData.append("recipe_name", recipe_name.current.value);
  formData.append("difficulty", difficulty.current.value);
  formData.append("serving", serving.current.value);
  formData.append("description", Prep.current.value + "/" + Garnish.current.value + "/" + Cooking.current.value);
  formData.append("cookingTime", cookingTime.current.value);
  formData.append("brief_description", brief_description.current.value);
  console.log(formData)

  const res = await fetch("/api/recipe/client/myKitchen/add", {
    method: "POST",
    body: formData,
    credentials: "include"
  });
  const data = await res.json();
  console.log(data.message);
  if (data.message === "recipe added") setisAdded(1);
  else {
    setisAdded(2);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
      });
}
}

  
  
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };


  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: ""  }]);
  };


  const updateIngredient = (index: number, field: string, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);

  };
  
    
  
  
  return (
    <>
      
      <div className="min-h-screen bg-[#FAF6F1] flex flex-col items-center pt-10 px-4  text-black">
        <form onSubmit={handleSubmit} className="w-full flex justify-center">
         
        
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-1 text-black">Create New Recipe</h1>
          <p className="text-black opacity-50 mb-6">Fill in the details to add a new recipe.</p>
          
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6 ">
              {{
            0: null,
            1: <h1 className='text-2xl text-green-600'>Added successfully!</h1>,
            2: <h1 className='text-2xl text-red-600'>Something went wrong!</h1>,
          }[isAdded]}
              <div>
                <label className="block text-lg text-gray-700 mb-1 font-bold ">Recipe Name</label>
                 <input  type="text" placeholder="Enter recipe name" className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-black" ref={recipe_name} required />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-lg text-gray-700 mb-1 font-bold">Category</label>
                <select className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-sm text-black" ref={category} >
                  <option value="">Select category</option>
                  <option value="healthy" >healthy</option>
                  <option value="normal">normal</option>
                  
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-lg font-bold text-gray-700 mb-1">Difficulty</label>
                <select className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-sm text-black" ref={difficulty}>
                  <option value="">Select difficulty</option>
                  <option value = "Easy">Easy</option>
                  <option value="Medium" >Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="flex-1">
                <div>
                  <label className="block text-lg text-gray-700 mb-1 font-bold ">Cooking Time</label>
                  <input type="number" placeholder="Enter cooking time" className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-black" ref={cookingTime} />
                </div>
              </div>
              <div>
                <label className="block text-lg text-gray-700 mb-1 font-bold ">serving</label>
                <input type="number" placeholder="Enter serving number" className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-black" ref={serving} />
              </div>
              
            </div>
            <label className="block text-md font-bold text-gray-700 mb-3">Brief Description</label>
              <textarea placeholder="Describe the cooking steps..." ref ={brief_description}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            <hr className="my-6 border-gray-300" />
    
            <div className="text-lg font-semibold mb-4">Recipe Photo</div>
            <div className="border-2 border-dashed border-green-200 bg-green-100 rounded-lg p-6 hover:bg-green-200 transition-colors cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                  
                 

                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    ref={image}
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                  />

                  <label htmlFor="image" className="cursor-pointer">
                    <Upload />
                  </label>

                  { fileName && <p className="text-2xl">{fileName}</p> }
                </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-600">Click to upload</span> or drag & drop
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

           <div className="text-lg font-semibold mb-4 ">Ingridents</div>
        <div className="mb-6">


          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-3 mb-3">

              
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientNameChange(e, index)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
               
                {showDropdown && activeIngredientIndex === index && suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto">
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        onMouseDown={() => selectIngredient(item.name)}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-amber-50 hover:text-amber-800"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                type="number"
                placeholder="quantity"
                value={ingredient.quantity}
                onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
                className="w-30 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <input
                type="text"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                className="w-30 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <button
              type="button"
              onClick={() => removeIngredient(index)}
              disabled={ingredients.length === 1}
              className="text-red-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed px-2 transition-colors">
              ✕
            </button>
            </div>
          ))}

          <button
            onClick={ addIngredient}
            type="button"
            className="mt-1 text-sm text-amber-700 hover:text-amber-900 border border-amber-700 hover:border-amber-900 hover:bg-orange-100  px-4 py-2 rounded-lg transition-colors"
          >
            + Add Ingredient
          </button>
        </div>

            <hr className="my-6 border-gray-300" />

            <div className="mb-6">
              <label className="block text-md font-bold text-gray-700 mb-3">1. Prep</label>
              <textarea placeholder="Describe the cooking steps..." ref ={Prep}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <label className="block text-md font-bold text-gray-700 mb-3">2. Cooking</label>
              <textarea placeholder="Describe the cooking steps..." ref={Cooking}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <label className="block text-md font-bold text-gray-700 mb-3">3. Garnish</label>
              <textarea placeholder="Describe the cooking steps..." ref={Garnish}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

           
              
            <button type ="submit"  className="mt-3 bg-amber-700 hover:bg-amber-900 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
              Save Recipe
            </button>
          </div>
        </div>
        </form>
      </div>
    </>
  );
}

export default Add;

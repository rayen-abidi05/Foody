"use client"

import { Upload } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import { useParams } from 'next/navigation';

function Edit() {
  const params = useParams();
  const id = params.id;
  
  const [fileName, setFileName] = useState<string>("");
  const brief_description = useRef<HTMLTextAreaElement>(null);
  const [isUpdated, setIsUpdated] = useState<0 | 1 | 2>(0);
  const category = useRef<HTMLSelectElement>(null);
  const recipe_name = useRef<HTMLInputElement>(null);
  const difficulty = useRef<HTMLSelectElement>(null);
  const serving = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const Prep = useRef<HTMLTextAreaElement>(null);
  const Cooking = useRef<HTMLTextAreaElement>(null);
  const Garnish = useRef<HTMLTextAreaElement>(null);
  const cookingTime = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState([{ name: "", quantity: 0, unit: "" }]);
  const [existingImage, setExistingImage] = useState<string>("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipe/${id}`, { credentials: "include" });
        const data = await res.json();
        const recipe = data.data;
        
        if (recipe_name.current) recipe_name.current.value = recipe.title;
        if (category.current) category.current.value = recipe.category;
        if (difficulty.current) difficulty.current.value = recipe.difficulty;
        if (serving.current) serving.current.value = recipe.serving;
        if (cookingTime.current) cookingTime.current.value = recipe.preparation_time;
        if (brief_description.current) brief_description.current.value = recipe.brief_description;
        
        const [prep, cooking, garnish] = recipe.preparation_method.split("/");
        
        if (Prep.current) Prep.current.value = prep || "";
        if (Cooking.current) Cooking.current.value = cooking || "";
        if (Garnish.current) Garnish.current.value = garnish || "";

        setExistingImage(recipe.image);
        

        if (recipe.list_ingredient && recipe.list_ingredient.length > 0) {
            
            setIngredients(recipe.list_ingredient.map((item: { name: string, quatity: number, unit: string }) => ({
                name: item.name,
                quantity: item.quatity,
                unit: item.unit
            })));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = image.current?.files?.[0];

    if (
      !category.current ||
      !recipe_name.current ||
      !difficulty.current ||
      !serving.current||
      !Prep.current ||
      !Garnish.current ||
      !Cooking.current ||
      !cookingTime.current ||
      !brief_description.current
    ) {
      setIsUpdated(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("existingImage", existingImage);
    
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("category", category.current.value);
    formData.append("recipe_name", recipe_name.current.value);
    formData.append("difficulty", difficulty.current.value);
    formData.append("serving", serving.current.value);
    formData.append("description", Prep.current.value + "/" + Cooking.current.value + "/" + Garnish.current.value);
    formData.append("cookingTime", cookingTime.current.value);
    formData.append("brief_description", brief_description.current.value);
    console.log(formData)
    const res = await fetch(`/api/recipe/update/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include"
    });

    const data = await res.json();
    if (data.message === "recipe updated") {
      setIsUpdated(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsUpdated(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };
  console.log(existingImage)
  return (
    <>
      <div className="min-h-screen bg-[#FAF6F1] flex flex-col items-center pt-10 px-4 text-black">
        <form onSubmit={handleSubmit} className="w-full flex justify-center">
          <div className="w-full max-w-4xl">
            <h1 className="text-4xl font-bold mb-1 text-black">Edit Recipe</h1>
            <p className="text-black opacity-50 mb-6">Update the details of your recipe.</p>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="mb-6">
                {{
                  0: null,
                  1: <h1 className='text-2xl text-green-600'>Updated successfully!</h1>,
                  2: <h1 className='text-2xl text-red-600'>Something went wrong!</h1>,
                }[isUpdated]}
                <div>
                  <label className="block text-lg text-gray-700 mb-1 font-bold">Recipe Name</label>
                  <input type="text" placeholder="Enter recipe name" className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-black" ref={recipe_name} required />
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-lg text-gray-700 mb-1 font-bold">Category</label>
                  <select className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-sm text-black" ref={category}>
                    <option value="">Select category</option>
                    <option value="healthy">healthy</option>
                    <option value="normal">normal</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-lg font-bold text-gray-700 mb-1">Difficulty</label>
                  <select className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-sm text-black" ref={difficulty}>
                    <option value="">Select difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-lg text-gray-700 mb-1 font-bold">Cooking Time</label>
                  <input type="number" placeholder="Enter cooking time" className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-black" ref={cookingTime} />
                </div>
                <div>
                  <label className="block text-lg text-gray-700 mb-1 font-bold ">serving</label>
                  <input type="number" placeholder="Enter serving number" className="w-full p-3 border-2 border-slate-300 rounded-lg outline-none text-black" ref={serving} />
                </div> 
              </div>

              <label className="block text-md font-bold text-gray-700 mb-3">Brief Description</label>
              <textarea placeholder="Describe the recipe..." ref={brief_description}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />

              <hr className="my-6 border-gray-300" />

              <div className="text-lg font-semibold mb-4">Recipe Photo</div>
              {existingImage && (
                <img src={existingImage} alt="Current recipe" className="w-40 h-40 object-cover rounded-lg mb-4" />
              )}
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
                  {fileName && <p className="text-2xl">{fileName}</p>}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-600">Click to upload new image</span> or drag & drop
                </div>
              </div>

              <hr className="my-6 border-gray-300" />

              <div className="text-lg font-semibold mb-4">Ingredients</div>
              <div className="mb-6">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Ingredient name"

                      value={ingredient.name}
                      onChange={(e) => updateIngredient(index, "name", e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
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
                      onClick={() => removeIngredient(index)}
                      disabled={ingredients.length === 1}
                      className="text-red-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed px-2 transition-colors">
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={addIngredient}
                  className="mt-1 text-sm text-amber-700 hover:text-amber-900 border border-amber-700 hover:border-amber-900 hover:bg-orange-100 px-4 py-2 rounded-lg transition-colors"
                >
                  + Add Ingredient
                </button>
              </div>

              <hr className="my-6 border-gray-300" />

              <div className="mb-6">
                <label className="block text-md font-bold text-gray-700 mb-3">1. Prep</label>
                <textarea placeholder="Describe the prep steps..." ref={Prep}
                  className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <label className="block text-md font-bold text-gray-700 mb-3">2. Cooking</label>
                <textarea placeholder="Describe the cooking steps..." ref={Cooking}
                  className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <label className="block text-md font-bold text-gray-700 mb-3">3. Garnish</label>
                <textarea placeholder="Describe the garnish steps..." ref={Garnish}
                  className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <hr className="my-6 border-gray-300" />

              <p className="text-gray-700 mb-5 text-lg font-bold">Nutritional Info (per serving)</p>
              <div className="flex gap-4 mb-6 text-black">
                <div className="flex-1 bg-emerald-100 gap-3 mb-3 rounded-lg p-4">
                  <p className="text-center">0</p>
                  <p className="text-sm text-gray-600 text-center">Calories( kcal )</p>
                </div>
                <div className="flex-1 bg-emerald-100 gap-3 mb-3 rounded-lg p-4">
                  <p className="text-center">0</p>
                  <p className="text-sm text-gray-600 text-center">Protein( g )</p>
                </div>
                <div className="flex-1 bg-emerald-100 gap-3 mb-3 rounded-lg p-4">
                  <p className="text-center">0</p>
                  <p className="text-sm text-gray-600 text-center">Carbohydrates( g )</p>
                </div>
                <div className="flex-1 bg-emerald-100 gap-3 mb-3 rounded-lg p-4">
                  <p className="text-center">0</p>
                  <p className="text-sm text-gray-600 text-center">Fat( g )</p>
                </div>
              </div>

              <button type="submit" className="mt-3 bg-amber-700 hover:bg-amber-900 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                Update Recipe
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit;
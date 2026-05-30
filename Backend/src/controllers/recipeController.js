const db = require ("../config/db")


    const  add = async (req,res,state) =>{  
        try{

            const recipe = req.body;
            console.log(recipe)
            console.log(req.user.username)
            const [user] = await db.query("SELECT id FROM users WHERE username = ?", [req.user.username]);
            const userId = user[0].id;
            

            const [result] = await db.query ("INSERT INTO recipes (image,title,category,preparation_method,preparation_time,difficulty,serving,brief_description,user_id,state) values (?,?,?,?,?,?,?,?,?,?)",
                [recipe.image,recipe.recipe_name,recipe.category,recipe.description,Number(recipe.cookingTime),recipe.difficulty,recipe.serving,recipe.brief_description,userId,state])
            
                const recipeId = result.insertId;
        
            const ingredients = JSON.parse(req.body.ingredients);
            
            for (const item of ingredients){
                console.log(item)
                const [row] = await db.query ("SELECT id_ingredient from ingredient where name = ?",[item.name])
                console.log(row[0].id_ingredient)
                const id = row[0].id_ingredient;
                await db.query("INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, unit) values (?,?,?,?)",
                [recipeId, id, item.quantity, item.unit])
                    
            }
            res.status(201).json({"message" : "recipe added"});

        }
        catch (err) {
            res.status(500).json({"message" : err.message})
        }
    }

const getRecipePublic = async (req, res,cat,state) =>{
    try{
        cat = cat.toLowerCase()
        
             if (cat === 'all') {
                const [rows] = await db.query("SELECT * from recipes where state = ?  ",[state])
                const recipes = rows.map((item) => {
                const clean = item.image
                    .replace(/\\/g, "/")        
                    .replace(/^uploads\//, ""); 

                return {
                    ...item,
                    imageurl: `http://localhost:5000/uploads/${clean}`
                };
                });
                res.status(200).json({message :"data selected", recipes})
            }
            else{
                const [rows] = await db.query("SELECT * from recipes where category = ? and state = ? ",[cat,state])
                const recipes = rows.map((item) => {
                const clean = item.image
                    .replace(/\\/g, "/")        
                    .replace(/^uploads\//, ""); 

                return {
                    ...item,
                    imageurl: `http://localhost:5000/uploads/${clean}`
                };
                });
                res.status(200).json({message :`data selected with ${cat}`, recipes})
            }
        }
       
    catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
    }
const getRecipe = async (req, res, user, cat,state) =>{
        
        try{
            cat = cat.toLowerCase()
       
            
            
            console.log(user.username)
            const [[idrow]] = await db.query("SELECT id from users where username = ?",[user.username])
            if (!idrow) {
                return res.status(404).json({ message: "User not found" });
            }
            const id = idrow.id
            
            if (cat === 'all') {
                const [rows] = await db.query("SELECT * from recipes where user_id = ?  and state = ?",[id,state])
                const recipes = rows.map((item) => {
                const clean = item.image
                    .replace(/\\/g, "/")        
                    .replace(/^uploads\//, ""); 

                return {
                    ...item,
                    imageurl: `http://localhost:5000/uploads/${clean}`
                };
                });
                res.status(200).json({message :"data selected", recipes})
            }
            else{
                const [rows] = await db.query("SELECT * from recipes where user_id = ? and category = ? and state = ? ",[id,cat,state])
                const recipes = rows.map((item) => {
                const clean = item.image
                    .replace(/\\/g, "/")        
                    .replace(/^uploads\//, ""); 

                return {
                    ...item,
                    imageurl: `http://localhost:5000/uploads/${clean}`
                };
                });
                res.status(200).json({message :`data selected with ${cat}`, recipes})
            }
        }
    
    catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
}


const getRecipebYId = async (req,res,id)=>{
    try{
        
        const [recipe] = await db.query("select * from recipes where id = ?",[id])
        const [ingredients] = await db.query("select * from recipe_ingredient where recipe_id = ?",[id])
        const clean = recipe[0].image
                    .replace(/\\/g, "/")        
                    .replace(/^uploads\//, "");
        recipe[0].image = `http://localhost:5000/uploads/${clean}`
        let total_kcal = 0
        let total_fat = 0
        let total_prot = 0
        let total_carbs = 0
        let list_ingredient = []
        let ingredient = {}
        await Promise.all(
    ingredients.map(async (item) => {
        const [macro] = await db.query("select * from macros where ingredient_id = ?", [item.ingredient_id]);
        const [[name]] = await db.query("select name, emoji from ingredient where id_ingredient = ?", [item.ingredient_id]);

       
        console.log("here")
        const ingredient = {
            name:    name.name,
            emoji:   name.emoji || "🍽️",
            quatity: item.quantity,
            unit:    item.unit,
        }

        list_ingredient.push(ingredient)

        let q = item.quantity;
        if (item.unit !== "cup") q = q / 100;
        console.log(list_ingredient)

        total_kcal += q * macro[0].calories;
        total_fat  += q * macro[0].fat;
        total_prot += q * macro[0].protein;
        total_carbs += q * macro[0].carbs;
    })
);  
        const val = {
            "list_ingredient" : list_ingredient,
            "kcal": Number.parseInt(total_kcal),
            "protein" :   Number.parseInt(total_prot),
            "carbs" :   Number.parseInt(total_carbs),
            "fat" :   Number.parseInt(total_fat)
         }
         const data = {...recipe[0],...val}
         res.status(200).json({"message" : "fetched by id succeed",data});
        
    }
    catch (err){
        res.status(500).json({"message" : err.message})
    }
}



const getID = async (req, res) => {
    try {
        const name = req.body.name;
        console.log("searching for title:", name);

        const [row] = await db.query("select * from recipes where title = ?", [name]);
        
        if (row.length === 0) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        const id = row[0].id;
        res.status(200).json({ message: "id exist", id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteByID = async (req,res,id)=>{
    try{
        await db.query("delete from recipes where id = ? ",[id]);
        res.status(200).json("deleted");
    }
    catch(err){
        res.status(500).json({"message":err.message});
    }
}
const updateByID = async (req, res, id) => {
    try {
        const { category, recipe_name, difficulty, serving , description, cookingTime, brief_description } = req.body;
        const ingredients = JSON.parse(req.body.ingredients);
        const image = req.body.image || req.body.existingImage;

        await db.query(
            "UPDATE recipes SET title = ?, category = ?, difficulty = ?, serving = ? , preparation_method = ?, preparation_time = ?, brief_description = ?, image = ? WHERE id = ?",
            [recipe_name, category, difficulty, serving , description, cookingTime, brief_description, image, id]
        );

        await db.query("DELETE FROM recipe_ingredient WHERE recipe_id = ?", [id]);

        await Promise.all(
            ingredients.map(async (item) => {
                const [[ingredient]] = await db.query(
                    "SELECT id_ingredient FROM ingredient WHERE name = ?", [item.name]
                );
                if (ingredient) {
                    await db.query(
                        "INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)",
                        [id, ingredient.id_ingredient, item.quantity, item.unit]
                    );
                }
            })
        );

        res.status(200).json({ message: "recipe updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const searchIngredients = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search || search.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const results = await db.query(
      'SELECT id_ingredient, name FROM ingredient WHERE name LIKE ? LIMIT 10',
      [`%${search.trim()}%`]
    );

    res.status(200).json(results[0]);       
  } catch (error) {
    console.error('Error searching ingredients:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {add,getRecipe,getRecipePublic,getRecipebYId,getID,deleteByID,updateByID,searchIngredients};

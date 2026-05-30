    const express = require("express");

    const {authenticateRole} = require("../middleware/authorizeRole");
    const {authenticateToken} = require("../middleware/authMiddleware");
    const {add,getRecipePublic,getRecipe,getRecipebYId,getID,deleteByID,updateByID,searchIngredients} = require ("../controllers/recipeController")

    const upload = require ("../middleware/upload");

    const router = express.Router();

    router.post("/",authenticateToken,(req,res)=>{
        try{
            
            add(req,res);
        }
        catch(err){
            res.json({"message" : err.message});
        }
    })
    router.post('/public',async (req,res)=>{
        try{
       
        
        const category = req.body.category
        const state = "public" ;
        
        await getRecipePublic(req, res, category, state);
        }
        catch(err){
            res.json({"message" : err.message});
        }
    })    

    router.post("/client/myKitchen/add",authenticateToken,authenticateRole,upload.single("image"),async (req,res)=>{
        try{
            console.log("hello")
            const state = req.user.role === "admin" ? "public" : "private";
            
            const user = req.user;
            
            req.body.image = req.file.path;
            await add(req,res,state);
        }
        catch(err){
            res.json({"message" : err.message});
        }
        
        
    })

    router.post("/client/mykitchen",authenticateToken,authenticateRole,async (req, res) =>{
        try{
        const user = req.user;
        
        const category = req.body.category
        const state = "private";
        await getRecipe(req, res, user, category, state);
        }
        catch(err){
            res.json({"message" : err.message});
        }
        
    })

    router.post("/getID",getID);

    router.get("/ingredients/search", async (req, res) => {
        try {
            await searchIngredients(req, res);
        } catch (err) {
            res.json({ "message": err.message });
        }
    })

    router.get("/:id",async (req, res) =>{
        try{
        
        const id = req.params.id
        await getRecipebYId(req, res, id)
        
        
        }
        catch(err){
            res.json({"message" : err.message});
        }
        
    })
    router.delete(`/delete/:id`,authenticateToken,authenticateRole,(req,res)=>{
        const id = req.params.id
        deleteByID(req,res,id)
    })
    router.put("/update/:id", authenticateToken, authenticateRole, upload.single("image"), (req, res) => {
    const id = req.params.id;
    if (req.file) {
        req.body.image = req.file.path;
    }
    updateByID(req, res, id);
});
    router.post("/admin/dashboard",authenticateToken,authenticateRole,async (req, res) =>{
        try{
        const user = req.user;
        
        const category = req.body.category
        const state = user.role === "admin" ? "public" : "private";
        console.log(state)
        await getRecipePublic(req, res, category, state);
        }
        catch(err){
            res.json({"message" : err.message});
        }
        
    })

    
    module.exports = router;

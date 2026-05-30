const db = require ('../config/db')


async function authenticateAdmin (req,res,next) {
    try{
        const user = req.user;  
        if (user.role !== "admin") {
            throw new Error();
        }
        next()
        
        
    }catch(err){
        return res.status(500).json({"message" : err.message})
    }
  

}




module.exports = {authenticateAdmin}
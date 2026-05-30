const db = require ('../config/db')


async function authenticateRole (req,res,next) {
    try{
        const user = req.user;  
        
        const [rows] = await db.query('SELECT * from users where username = ? and role = ?',[user.username,user.role])
        if(rows.length === 0){
            return res.status(403).json({"message" : "no access for you!!!"})
        }
        next();
    }catch(err){
        return res.status(500).json({"message" : err.message})
    }
  

}




module.exports = {authenticateRole}
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const { SignJWT } = require("jose");



const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const refresh_secret = new TextEncoder().encode(process.env.REFRESH_JWT_SECRET);


const register = async (req,res) =>{
   
    try{
        const user = req.body;
        const [rows] = await db.query("SELECT * from users where email=? ",[user.email]);
        if (rows.length > 0) {
            return res.status(400).json({message:"l' email et le mot passe sont incorrectes"}); 
        }
        const pass_hashed = await bcrypt.hash(user.password, 10);
        
         await db.query("INSERT into users (email, password, username, role) values (?,?,?,?)", [user.email,pass_hashed,user.username,user.role]);
       
        const token = await new SignJWT({username : user.username,role : user.role}).setProtectedHeader({alg : "HS256"})
                        .setIssuedAt()
                        .setExpirationTime("15m")
                        .sign(secret);
        const refresh_token = await new SignJWT({username : user.username,role : user.role})
        .setProtectedHeader({alg : "HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(refresh_secret);
        res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        domain: "localhost",
        maxAge: 15 * 60 * 1000,
        });
        res.cookie("refreshToken",refresh_token,{
            httpOnly : true,
            secure : false,
            sameSite : 'lax',
            domain: "localhost",
            maxAge : 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({message:"user est ajouté avec succees",token});
        
    }
     catch(exp) {
        res.status(500).json({message:exp.message});
        
     }
    
}
const login = async (req,res) =>{
    try{
        const user = req.body;
        
        const [row_name] = await db.query("SELECT * from users where username=? ", [user.username]);
        if (row_name.length === 0) {
        return res.status(401).json({message:"ce username n'existe pas"});
        }  
        const isCorrect = await bcrypt.compare(user.password, row_name[0].password);
        if (!isCorrect) {
            return res.status(400).json({message:"mot de passe incorrete"});
        }
        const token = await new SignJWT({username : row_name[0].username,role : row_name[0].role})
        .setProtectedHeader({alg : "HS256"})
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(secret);

        const refresh_token = await new SignJWT({username : row_name[0].username,role : row_name[0].role})
        .setProtectedHeader({alg : "HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(refresh_secret);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            domain: "localhost",
            maxAge: 15 * 60 * 1000,
            });
         res.cookie("refreshToken",refresh_token,{
            httpOnly : true,
            secure : false,
            sameSite : 'lax',
            domain: "localhost",
            maxAge : 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({message :"login avec succees",username : user.username});
        
    }
        
        catch (exp){
        res.status(500).json({message : exp.message});
        }
}

const logout = async (req,res) =>{
    
    res.clearCookie("token", {
    domain: "localhost",
  });
    res.clearCookie("refreshToken",{
       domain: "localhost",
        
    });
    res.status(200).json({message: "logged out"});

}
const me = (req,res) =>{
    const name = "Rayen"
    const last_name ="Abidi"
    res.json({'message': "welcome",name,last_name})
}


module.exports = { register,login,logout,me };
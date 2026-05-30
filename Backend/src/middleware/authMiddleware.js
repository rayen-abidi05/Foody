const {jwtVerify} = require("jose");

async function authenticateToken (req,res,next) {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Token missing' ,ok : false});
  }
  try{
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const {payload} = await jwtVerify(token,secret);
    req.user = payload;
    next();

  }
  catch (err){
        return res.status(403).json({message : err.message , ok : false});
  }

}




module.exports = {authenticateToken}
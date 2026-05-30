const db = require("../config/db");
const { SignJWT, jwtVerify } = require("jose");


const refresh_secret = new TextEncoder().encode(process.env.REFRESH_JWT_SECRET)
const secret = new TextEncoder().encode(process.env.JWT_SECRET)


async function verifyUserExistance(val) {
    const [rows] = await db.query('SELECT username from users where username = ?',[val])
    if (rows.length === 0){
        return false;
    }
    return true;
}

async function refreshing(req,res) {


    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({message : "no refresh token"})
    }
    try{
        const {payload} = await jwtVerify(refreshToken,refresh_secret);
        if (!(await verifyUserExistance(payload.username))) {
            return res.status(401).json({ message: "User not found" }); 
        }
        const token = await new SignJWT(payload)
        .setProtectedHeader({alg :"HS256"})
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(secret);
        res.status(200).json( {message : "new access token after refreshing",token});
    }
    catch(err){
        res.status(401).json( {message : 'Invalid or expired refresh token'});
    }
    

}


module.exports = {refreshing}
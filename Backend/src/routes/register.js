require("dotenv").config();
const express = require ("express")

const { SignJWT } = require("jose");

const app = express();

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function GenerateToken() {
    
    const token = await new SignJWT({name:"rayen",role:"client"})
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);

    console.log(`"${token}"`);
//eyJhbGciOiJIUzI1NiJ9
}
GenerateToken()

app.listen(process.env.PORT,()=>{
    console.log(`je suis dans authen register ${process.env.PORT} `);
})

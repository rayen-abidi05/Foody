
import "@/app/font.css";
import '@/app/globals.css'
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { notFound } from "next/navigation";


 











export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const cookieStore = await cookies()
     const token = cookieStore.get("token")?.value
     if (!token) {
        notFound();
    }
     
     if (token) {
       try {
         const secret = new TextEncoder().encode(process.env.JWT_SECRET)
         await jwtVerify(token, secret)
         
       } catch(err) {
         
         notFound()
       }
     }
     
    return (
        <>
        {children}
        </>
    );  
    }


export async function getData( URL : string , category = "All") {
    try{
        const res = await fetch( URL ,{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({"category" : category}),
        credentials: "include"
         
    } )
    
        const data = await res.json()
    
    
        return data;
    }
    catch (err){
        return { "message": (err as Error).message }; 
    }
    
}
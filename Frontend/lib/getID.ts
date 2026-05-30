

export async function getID( URL : string , name : string ) {
    try{
        const res = await fetch( URL ,{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({"name" : name}),
        credentials: "include"
         
    } )
    
        const data = await res.json()
    
    
        return data;
    }
    catch (err){
        return { "message": (err as Error).message }; 
    }
    
}
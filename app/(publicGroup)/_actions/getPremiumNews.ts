import { cookies } from "next/headers";

export const getPremiumNews = async()=>{
    
    const cookieStore = await cookies();
    
        const accessToken = cookieStore.get("accessToken")?.value || null;
        console.log(accessToken)
    
        if(!accessToken){
            // throw new Error("User not Logged In");
    
            return{
                success : false,
                message : "User not Logged In",
            }
        }
    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium`,{
        headers :{
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`,
            Cookie : `accessToken=${accessToken}`
        },
        
        cache : "no-store",
        next: {
            tags:["premium-posts"]
        }
    });

    const result = await res.json();
    return result;
}

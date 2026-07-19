"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Updated LoginState type to support both success and failure cases.
type LoginState = {
    success : boolean; // Changed from true to boolean to accommodate failure responses
    statusCode : number;
    message : string;
    data? : { // Made optional (?) because login failures won't return tokens
        accessToken : string;
        refreshToken : string;
    }
};

// Use LoginState | null for prevState because the initial state of the hook is null.
export const loginAction = async (prevState : LoginState | null , formData: FormData)=>{
    console.log(formData);
    console.log(prevState, "prev state");

    const email = formData.get("email");
    const password = formData.get("password");

    const payload ={
        email,
        password
    }

    const res =await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    })

    // Typed as LoginState (which cannot be null) to avoid null check errors on the result object.
    const result: LoginState = await res.json();
    // console.log(result);

    if(result.success){
        if (result.data) {
            const cookieStore = await cookies()

            cookieStore.set("accessToken", result.data.accessToken,{
                httpOnly : true,
                maxAge : 60 * 60 * 24,
                sameSite: "lax",
            })

            cookieStore.set("refreshToken", result.data.refreshToken,{
                httpOnly : true,
                maxAge : 60 * 60 * 24 * 7,
                sameSite: "lax"
            })
        }

        // Correctly redirect the user to the dashboard
        redirect("/dashboard");
        // redirect("/dashboard", "replace");
    }

    return result;
}
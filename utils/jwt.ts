"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken"


const verifyToken = (token :string, secret: string)=>{
    try {
        const verifiedToken =  jwt.verify(token, secret);
    // return verifiedToken;
    return {
        success :true,
        data: verifiedToken
    }
    } catch (error : any) {
        console.log("Token Verification failed:", error)
        // throw new Error (error.message);
        return {
            success:false,
            error:error.message
        }
    }
}

export const jwtUtils ={
    verifyToken,
}
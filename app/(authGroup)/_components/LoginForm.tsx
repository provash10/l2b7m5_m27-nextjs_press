"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect } from "react";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

const LoginForm = () => {
  // Passed null instead of false as the initial state to match the LoginState | null type
  const [state, action, pending]= useActionState(loginAction, null)

  // const router = useRouter();

  useEffect(()=>{
    if(!state) return;

    // if(state.success){
    //    toast.success(state.message || "Login Successfull !!");
    //   //  router.push("/dashboard")
    // }
    if(!state.success){
      toast.error(state.message || "Login Failed")
    }

  },[state])
  return(
    <form action={action} className="space-y-4">
        <Card className="p-5 space-y-4">
            <Input name="email" type="email" placeholder="Enter Your Email" required />
            <Input name="password" type="password" placeholder="Enter Your Password" required/>
            <Button type="submit">
                {/* Login */}
                {
                  pending ? "Submitting..." : "Login"
                }
            </Button>
        </Card>
    </form>
  );
};

export default LoginForm;

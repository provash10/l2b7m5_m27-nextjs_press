import { Button } from "@/components/ui/button";
import React from "react";

const LoginButton = () => {
    console.log(process.env.BACKEND_API_URL,"Hello")
  return (
  <div>
    <Button>Login</Button>
    </div>
);
};

export default LoginButton;

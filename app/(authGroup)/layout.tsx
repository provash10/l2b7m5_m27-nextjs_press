import { Navbar } from "@/components/ui/shared/navbar";
import { getMe } from "@/service/getMe";
import React from "react";

const AuthGroupLayout = async(
  { children }: 
    { children: React.ReactNode }) => {

      const user = await getMe();

  return(
  <div className="max-w-7xl mx-auto">
    <Navbar user={user}></Navbar>
    {children}
  </div>
  
  );
};

export default AuthGroupLayout;

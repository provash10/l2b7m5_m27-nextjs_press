import React from "react";

const AuthLayout = ({children} : {children : React.ReactNode}) => {
  return(
  <div>
    Auth Layout is special only for Auth Route or 
    Nested Routes Inside the Auth Directory.

  {children}
  </div>
  );
};

export default AuthLayout;

import React from "react";

const AuthorsLayout = ({children} : {children : React.ReactNode}) => {
  return(
  <div>
    Authors Layout is special only for Author Route or 
    Nested Routes Inside the Authors Directory.

  {children}
  </div>
  );
};

export default AuthorsLayout;

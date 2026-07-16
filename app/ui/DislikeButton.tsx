"use client";

import React from "react";

const DislikeButton = ({blogSlug}:{blogSlug : string}) => {
  return <div>
    <button onClick={()=>{
    console.log("Dislike Button Clicked for blog : ", blogSlug)
  }}>Dislike{blogSlug}</button>;
  </div>;
};

export default DislikeButton;

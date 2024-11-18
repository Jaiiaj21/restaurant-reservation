'use client'
import React from "react";

const InteractiveCard = ({ children, contentName }: { children: React.ReactNode, contentName: string }) => {

  return (
    <div className="w-full h-[300px] rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl" >
      {children}
    </div>
  );
}

export default InteractiveCard;

'use client'
import React from "react";

const InteractiveCard = ({ children, contentName }: { children: React.ReactNode, contentName: string }) => {

  return (
    <div className="w-full h-[300px] rounded-lg shadow-lg cursor-pointer hover:shadow-2xl">
      {children}
    </div>
  );
}

export default InteractiveCard;

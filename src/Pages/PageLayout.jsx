import React from "react";
import { useNavigate } from "react-router-dom";

const PageLayout = ({ children, title }) => {
  const navigate = useNavigate(); 

  const handleBuyCredits = () => {
    navigate("/payment"); 
  };

  return (
        <div className={`bg-black ml-[255px] p-6`}>
        <div className="flex justify-end mb-6">
        <div className="px-4 py-2 rounded-full border border-gray-700">
          Credits: 96
          <span onClick={handleBuyCredits} className=" ml-4 cursor-pointer text-blue-600">Buy Credits</span>
        </div>
      </div>
        <div>
          {children}
        </div>
        </div>
  );
};

export default PageLayout;

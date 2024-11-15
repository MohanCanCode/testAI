import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../Context/ThemeContext";

const PageLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleBuyCredits = () => {
    navigate("/payment");
  };

  return (
    <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} ml-[255px] p-6`}>
      <div className="flex justify-end mb-6">
        <div
          className={`px-4 py-2 rounded-full border ${
            theme === "dark" ? "border-gray-700" : "border-gray-300"
          }`}
        >
          Credits: 96
          <span
            onClick={handleBuyCredits}
            className={`ml-4 cursor-pointer ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Buy Credits
          </span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PageLayout;

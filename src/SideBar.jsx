import React, { useContext } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { ImageIcon, User2Icon, ArrowUpRightIcon, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeContext from "./Context/ThemeContext";

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useUser();
  const location = useLocation();

  const menuItems = [
    { icon: <ImageIcon size={20} />, text: "Imagine", path: "/", id: 1 },
    { icon: <User2Icon size={20} />, text: "Face Profiles", path: "/face-profiles", id: 2 },
    { icon: <ArrowUpRightIcon size={20} />, text: "Upscale", path: "/upscale", id: 3 },
  ];

  return (
    <div className={`fixed inset-y-0 z-50 flex flex-col w-64 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="p-6">
        <h1 className="text-xl font-bold">
          <span className="font-montserrat">IMAGIN</span>
          <span className={`font-['Pretty_Dahlia'] ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>Xai</span>
        </h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 ${theme === "dark" ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-200"} transition-colors ${
                  location.pathname === item.path ? (theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black") : ""
                }`}
              >
                {item.icon}
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`p-6 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
        <div
          onClick={toggleTheme}
          className="flex items-center gap-3 mb-4 cursor-pointer transition-colors"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </div>

        <div className="flex items-center gap-3">
          <UserButton />
          <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{user.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

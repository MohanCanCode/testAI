import { UserButton, useUser } from "@clerk/clerk-react";
import { ImageIcon, User2Icon, ArrowUpRightIcon, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { icon: <ImageIcon size={20} />, text: "Imagine", path: "/", id: 1 },
    {
      icon: <User2Icon size={20} />,
      text: "Face Profiles",
      path: "/face-profiles",
      id: 2,
    },
    {
      icon: <ArrowUpRightIcon size={20} />,
      text: "Upscale",
      path: "/upscale",
      id: 3,
    },
  ];

  const { user } = useUser();
  const location = useLocation(); // Get the current route

  return (
    <div className="fixed inset-y-0 z-50 flex flex-col w-64 bg-black text-white">
      <div className="p-6">
        <h1 className="text-xl font-bold">
          <span className="font-montserrat">IMAGIN</span>
          <span className="font-['Pretty_Dahlia'] text-cyan-400">Xai</span>
        </h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-800 transition-colors ${
                  location.pathname === item.path ? 'bg-gray-800 text-white' : ''
                }`}
              >
                {item.icon}
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4 text-gray-300 cursor-pointer">
          <Moon size={20} />
          <span>Dark mode</span>
        </div>

        <div className="flex items-center gap-3">
          <UserButton />
          <span className="text-gray-300">{user.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

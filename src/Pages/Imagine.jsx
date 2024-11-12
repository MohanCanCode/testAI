import { ChevronDown, Download, RefreshCw, Search, Upload } from "lucide-react";
import React, { useState } from "react";
import CustomDropdown from "../Components/CustomDropDown";
import PortraitPopup from "../Components/SwapPopup";
import user from "../assets/user.png";

const Imagine = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    aspectRatio: "3:4",
    model: "3:4",
  });
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const aspectRatios = [
    { value: '3:4', label: '3:4 Portrait' },
    { value: '4:3', label: '4:3 Landscape' },
    { value: '1:1', label: '1:1 Square' },
    { value: '16:9', label: '16:9 Widescreen' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenerateClick = () => {
    console.log("Generating with the following data:", formData);
  };

  return (
    <div className="bg-black text-white pb-6 pl-6 pr-6 overflow-y-auto">
      <PortraitPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        imageUrl={user}
        title="Lakshmi Portrait"
        description="Beautiful lakshmi in red saree holding a glowing lotus with gold coins falling in the background"
      />
      <div className="relative mb-2">
        <div className="absolute left-4 top-4">
          <Upload className="w-5 h-5 text-gray-400" />
        </div>
        <textarea
          className="w-full h-24 bg-black border border-gray-800 rounded-lg px-12 py-4 resize-none focus:outline-none focus:border-purple-500"
          placeholder="Enter your prompt here.."
          name="prompt"
          value={formData.prompt}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex gap-4 items-center mb-2">
        <div className="flex-1 flex items-center gap-4">
          <span className="text-gray-400">Aspect Ratio</span>
          <CustomDropdown
            options={aspectRatios}
            defaultValue={formData.aspectRatio}
            onChange={(value) => handleDropdownChange("aspectRatio", value)}
            placeholder="Select aspect ratio"
            backgroundColor="bg-purple-500"
            textColor="text-white"
            width="w-72"
            disabled={false}
            className="my-4"
          />
        </div>

        <div className="flex-1 flex items-center gap-4">
          <span className="text-gray-400">Select Model</span>
          <CustomDropdown
            options={aspectRatios}
            defaultValue={formData.model}
            onChange={(value) => handleDropdownChange("model", value)}
            placeholder="Select model"
            backgroundColor="bg-purple-500"
            textColor="text-white"
            width="w-72"
            disabled={false}
            className="my-4"
          />
        </div>
      </div>

      <button
        onClick={handleGenerateClick}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium mb-6"
      >
        <span>Generate</span>
        <span className="text-sm text-blue-300 ml-2">Use 5 credits</span>
      </button>

      <div className="h-[400px] bg-gray-900 rounded-lg flex items-center justify-center mb-4 relative">
        <div className="text-center text-gray-500">
        <img
              src={user}
              alt="image"
              className="h-[350px] object-cover rounded-lg"
            />
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2"
            onClick={() => setIsPopupOpen(true)}
          >
            <RefreshCw className="w-4 h-4" />
            Swap face
          </button>
          <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="pt-4">
          <div className="flex items-center gap-6 mb-4">
            <h2 className="text-purple-500">My Creations :</h2>
            <nav className="flex gap-6">
              <div className="text-white border-b-2 border-white pb-1">
                Recently made
              </div>
              <div className="text-gray-500 hover:text-white">Old to new</div>
              <div className="text-gray-500 hover:text-white">Likes</div>
            </nav>
          </div>
        </div>
        <div className="self-end">
          <div className="relative">
            <Search className="absolute right-4 top-2.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent border border-gray-800 rounded-full px-10 py-2 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imagine;

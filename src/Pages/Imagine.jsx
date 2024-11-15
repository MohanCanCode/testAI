import { ChevronDown, Download, RefreshCw, Search, Upload } from "lucide-react";
import React, { useState, useEffect, useContext } from 'react';
import CustomDropdown from "../Components/CustomDropDown";
import PortraitPopup from "../Components/SwapPopup";
import user from "../assets/user.png";
import ThemeContext from "../Context/ThemeContext";

const mockApi = {
  fetchRecentlyMade: () => {
    return Promise.resolve({
      status: "success",
      data: [
        {
          id: 1,
          url: "https://dummyimage.com/300",
          title: "Latest Creation",
          timestamp: "2024-11-14T10:30:00",
          likes: 145
        },
        {
          id: 2,
          url: "https://dummyimage.com/300",
          title: "New Project",
          timestamp: "2024-11-13T15:20:00",
          likes: 89
        },
        {
          id: 1,
          url: "https://dummyimage.com/300",
          title: "Latest Creation",
          timestamp: "2024-11-14T10:30:00",
          likes: 145
        },
        {
          id: 2,
          url: "https://dummyimage.com/300",
          title: "New Project",
          timestamp: "2024-11-13T15:20:00",
          likes: 89
        },
        {
          id: 1,
          url: "https://dummyimage.com/300",
          title: "Latest Creation",
          timestamp: "2024-11-14T10:30:00",
          likes: 145
        },
        {
          id: 2,
          url: "https://dummyimage.com/300",
          title: "New Project",
          timestamp: "2024-11-13T15:20:00",
          likes: 89
        },
        {
          id: 1,
          url: "https://dummyimage.com/300",
          title: "Latest Creation",
          timestamp: "2024-11-14T10:30:00",
          likes: 145
        },
        {
          id: 2,
          url: "https://dummyimage.com/300",
          title: "New Project",
          timestamp: "2024-11-13T15:20:00",
          likes: 89
        }
      ]
    });
  },
  fetchOldToNew: () => {
    return Promise.resolve({
      status: "success",
      data: [
        {
          id: 3,
          url: "https://dummyimage.com/300",
          title: "First Project",
          timestamp: "2024-01-10T09:15:00",
          likes: 302
        },
        {
          id: 4,
          url: "https://dummyimage.com/300",
          title: "Second Creation",
          timestamp: "2024-02-08T14:45:00",
          likes: 167
        }
      ]
    });
  },
  fetchMostLiked: () => {
    return Promise.resolve({
      status: "success",
      data: [
        {
          id: 5,
          url: "https://dummyimage.com/300",
          title: "Popular Creation",
          timestamp: "2024-03-15T11:30:00",
          likes: 523
        },
        {
          id: 6,
          url: "https://dummyimage.com/300",
          title: "Trending Project",
          timestamp: "2024-04-20T16:45:00",
          likes: 489
        }
      ]
    });
  }
};

const Imagine = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    aspectRatio: "3:4",
    model: "3:4",
  });
  const [activeTab, setActiveTab] = useState('recently');
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  const fetchImages = async (tab) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (tab) {
        case 'recently':
          response = await mockApi.fetchRecentlyMade();
          break;
        case 'old':
          response = await mockApi.fetchOldToNew();
          break;
        case 'likes':
          response = await mockApi.fetchMostLiked();
          break;
        default:
          response = await mockApi.fetchRecentlyMade();
      }
      setImages(response.data);
    } catch (err) {
      setError('Failed to fetch images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(activeTab);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredImages = images.filter(image =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
    <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} pb-6 pl-6 pr-6 overflow-y-auto`}>
      <PortraitPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        imageUrl={user}
        title="Lakshmi Portrait"
        description="Beautiful lakshmi in red saree holding a glowing lotus with gold coins falling in the background"
      />
      <div className="relative mb-2">
        <div className="absolute left-4 top-4">
          <Upload className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} w-5 h-5`} />
        </div>
        <textarea
          className={`w-full h-24 ${theme === "dark" ? "bg-black text-white border-gray-800" : "bg-gray-100 text-black border-gray-300"} 
            rounded-lg px-12 py-4 resize-none focus:outline-none focus:border-purple-500`}
          placeholder="Enter your prompt here.."
          name="prompt"
          value={formData.prompt}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex gap-4 items-center mb-2">
        <div className="flex-1 flex items-center gap-4">
          <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Aspect Ratio</span>
          <CustomDropdown
            options={aspectRatios}
            defaultValue={formData.aspectRatio}
            onChange={(value) => handleDropdownChange("aspectRatio", value)}
            placeholder="Select aspect ratio"
            backgroundColor={theme === "dark" ? "bg-purple-500" : "bg-purple-300"}
            textColor={theme === "dark" ? "text-white" : "text-black"}
            width="w-72"
            disabled={false}
            className="my-4"
          />
        </div>

        <div className="flex-1 flex items-center gap-4">
          <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Select Model</span>
          <CustomDropdown
            options={aspectRatios}
            defaultValue={formData.model}
            onChange={(value) => handleDropdownChange("model", value)}
            placeholder="Select model"
            backgroundColor={theme === "dark" ? "bg-purple-500" : "bg-purple-300"}
            textColor={theme === "dark" ? "text-white" : "text-black"}
            width="w-72"
            disabled={false}
            className="my-4"
          />
        </div>
      </div>

      <button
        onClick={handleGenerateClick}
        className={`w-full ${theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 hover:bg-blue-500"} 
          text-white rounded-lg py-3 font-medium mb-6`}
      >
        <span>Generate</span>
        <span className="text-sm text-blue-300 ml-2">Use 5 credits</span>
      </button>

      <div className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-200"} h-[400px] rounded-lg flex items-center justify-center mb-4 relative`}>
        <div className={`${theme === "dark" ? "text-gray-500" : "text-gray-700"} text-center`}>
          <img
            src={user}
            alt="image"
            className="h-[350px] object-cover rounded-lg"
          />
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            className={`${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-300 hover:bg-gray-400"} 
              px-6 py-2 rounded-lg flex items-center gap-2`}
            onClick={() => setIsPopupOpen(true)}
          >
            <RefreshCw className="w-4 h-4" />
            Swap face
          </button>
          <button
            className={`${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-300 hover:bg-gray-400"} 
              px-6 py-2 rounded-lg flex items-center gap-2`}
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="pt-4">
            <div className="flex items-center gap-6 mb-4">
              <h2 className={`${theme === "dark" ? "text-purple-500" : "text-purple-700"}`}>My Creations :</h2>
              <nav className="flex gap-6">
                <div
                  onClick={() => handleTabClick('recently')}
                  className={`pb-1 ${
                    activeTab === 'recently'
                      ? `${theme === "dark" ? "text-white border-white" : "text-black border-black"} border-b-2`
                      : `${theme === "dark" ? "text-gray-500" : "text-gray-700"} hover:${theme === "dark" ? "text-white" : "text-black"}`
                  }`}
                >
                  Recently made
                </div>
                <div
                  onClick={() => handleTabClick('old')}
                  className={`pb-1 ${
                    activeTab === 'old'
                      ? `${theme === "dark" ? "text-white border-white" : "text-black border-black"} border-b-2`
                      : `${theme === "dark" ? "text-gray-500" : "text-gray-700"} hover:${theme === "dark" ? "text-white" : "text-black"}`
                  }`}
                >
                  Old to new
                </div>
                <div
                  onClick={() => handleTabClick('likes')}
                  className={`pb-1 ${
                    activeTab === 'likes'
                      ? `${theme === "dark" ? "text-white border-white" : "text-black border-black"} border-b-2`
                      : `${theme === "dark" ? "text-gray-500" : "text-gray-700"} hover:${theme === "dark" ? "text-white" : "text-black"}`
                  }`}
                >
                  Likes
                </div>
              </nav>
            </div>
          </div>
          <div className="self-end">
            <div className="relative">
              <Search className={`${theme === "dark" ? "text-gray-500" : "text-gray-700"} absolute right-4 top-2.5 w-5 h-5`} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${theme === "dark" ? "bg-transparent text-white border-gray-800" : "bg-gray-100 text-black border-gray-300"} 
                  rounded-full px-10 py-2 focus:outline-none focus:border-purple-500`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
          {filteredImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className={`absolute bottom-0 left-0 right-0 ${theme === "dark" ? "bg-gradient-to-t from-black/70 to-transparent" : "bg-gradient-to-t from-gray-100/70 to-transparent"} 
                p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity`}>
                <h3 className={`${theme === "dark" ? "text-white" : "text-black"} text-sm font-medium`}>{image.title}</h3>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} text-xs`}>❤️ {image.likes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Imagine;

import React, { useState } from "react";
import { X } from "lucide-react";
import user from "../assets/user.png";

const PortraitPopup = ({ isOpen, onClose, imageUrl, title, description }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const profiles = [
    {
      id: 1,
      src: user,
      alt: "Profile 1",
      profileName: "dummy1",
    },
    {
      id: 2,
      src: user,
      alt: "Profile 2",
      profileName: "dummy2",
    },
  ];

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCreatePortrait = async () => {
    if (!selectedProfile) {
      alert("Please select a profile.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/create-portrait", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          profileId: selectedProfile.id,
        }),
      });

      if (response.ok) {
        alert("Portrait created successfully!");
        onClose(); 
      } else {
        alert("Failed to create portrait.");
      }
    } catch (error) {
      console.error("Error creating portrait:", error);
      alert("An error occurred while creating the portrait.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-gray-400 rounded-lg max-w-4xl w-full overflow-hidden relative p-4">
        <div
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:text-gray-300 transition-colors cursor-pointer"
          aria-label="Close popup"
        >
          <X size={24} />
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 rounded-lg">
            <img
              src={imageUrl}
              alt={title}
              className="h-[600px] object-cover rounded-lg"
            />
          </div>

          <div className="lg:w-2/3 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-300 mb-8">{description}</p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Select Face Profile to apply
              </h3>
              <div className="flex gap-4">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className={`flex flex-col items-center cursor-pointer ${
                      selectedProfile?.id === profile.id
                        ? "border-2 border-blue-600"
                        : ""
                    }`}
                    onClick={() => handleProfileSelect(profile)}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={profile.src}
                        alt={profile.alt}
                        className="w-full h-full object-cover transform scale-110"
                      />
                    </div>
                    <span className="text-center mt-2">{profile.profileName}</span>
                  </div>
                ))}

                <div className="flex flex-col items-center cursor-pointer">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span className="text-2xl">+</span>
                  </div>
                  <span className="text-center mt-2">Create New</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCreatePortrait}
              className="mt-[250px] w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" />
                    <path
                      fill="none"
                      d="M12 2a10 10 0 1 1-10 10"
                    ></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                <>
                  Create portrait
                  <span className="text-blue-300 ml-2">Use 25 Credits</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortraitPopup;

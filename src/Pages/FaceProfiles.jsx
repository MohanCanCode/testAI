import React, { useState } from 'react';
import user from "../assets/user.png";

const FaceProfiles = () => {
  const [profiles] = useState([
    { id: 1, name: 'Navira', imageUrl: user },
    { id: 2, name: 'Me', imageUrl: user }
  ]);

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(Array(8).fill(null));
  const [newProfileName, setNewProfileName] = useState('');

  const handleSelectProfile = (id) => {
    setSelectedProfileId(id);
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...uploadedImages];
      newImages[index] = URL.createObjectURL(file); 
      setUploadedImages(newImages);
    }
  };

  const handleCreateProfile = () => {
    if (!newProfileName) {
      alert("Please enter a profile name.");
      return;
    }
    const validImages = uploadedImages.filter(image => image !== null);
    const profile = {
      profilename: newProfileName,
      images: validImages
    };
    console.log('Profile Created:', profile);
    setNewProfileName('');
    setUploadedImages(Array(8).fill(null));
  };

  const handleEditProfile = () => {
    console.log('Editing profile', selectedProfileId);
  };

  const uploadInstructions = [
    'Use clear, well-lit photos with only one person (no group shots).',
    'Include different angles with the face fully visible and similar expressions.',
    'Avoid big differences in face appearance or blurry images.'
  ];

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <div className="mb-12 border-b border-gray-300 pb-6">
        <h2 className="text-purple-500 text-lg mb-6">My Face profiles:</h2>
        <div className="flex gap-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`text-center cursor-pointer ${selectedProfileId === profile.id ? 'bg-[#0069CB80]' : ''}`}
              onClick={() => handleSelectProfile(profile.id)}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                <img
                  src={profile.imageUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm">{profile.name}</p>
            </div>
          ))}
        </div>
        {selectedProfileId && (
          <button
            onClick={handleEditProfile}
            className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Last Edit
          </button>
        )}
      </div>

      <div>
        <h2 className="text-white text-lg mb-6">Create a new Face profile:</h2>

        <div className="bg-zinc-900 p-4 rounded-lg mb-8">
          <p className="mb-2">For optimal face swapping results:</p>
          <ul className="list-decimal pl-6">
            {uploadInstructions.map((instruction, index) => (
              <li key={index} className="text-sm text-gray-300 mb-1">{instruction}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <label className="block mb-2">Face Profile Name:</label>
          <input
            type="text"
            className="w-full bg-transparent border border-gray-700 rounded-lg p-2"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="block mb-4">Upload training images:</label>
          <div className="grid grid-cols-4 gap-4">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square border border-gray-700 rounded-lg flex items-center justify-center cursor-pointer relative"
              >
                {image ? (
                  <img
                    src={image}
                    alt={`uploaded-${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                      <path d="M3 14l5-5 6 6" strokeWidth="2" />
                      <path d="M14 13l3-3 4 4" strokeWidth="2" />
                    </svg>
                  </div>
                )}
                {!image && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload at least 10 to 15 images, maximum 20</p>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleCreateProfile}
        >
          Create face profile
          <span className="text-sm text-blue-300 ml-2">Use 150 credits</span>
        </button>
      </div>
    </div>
  );
};

export default FaceProfiles;

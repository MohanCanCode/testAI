import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

const Upscale = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scaleOption, setScaleOption] = useState(null);
  const [upscaledImage, setUpscaledImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setUpscaledImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpscale = () => {
    if (selectedImage && scaleOption) {
      setUpscaledImage(selectedImage);
    }
  };

  const buttonBaseClasses = "h-10 rounded-md text-sm font-medium transition-colors focus:outline-none";
  const primaryButtonClasses = "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed";
  const secondaryButtonClasses = "bg-gray-800 text-gray-300 hover:bg-gray-700";

  return (
    <div className="flex bg-black">
      <div className="w-64 border-r border-gray-800">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <label className="block w-full">
              <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors">
                <div className="text-center">
                  <ImageIcon className="mx-auto mb-2 text-gray-400" size={24} />
                  <span className="text-sm text-gray-400">upload image</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </label>

            <div className="flex gap-2">
              <button
                onClick={() => setScaleOption('2x')}
                className={`flex-1 ${buttonBaseClasses} ${
                  scaleOption === '2x' ? primaryButtonClasses : secondaryButtonClasses
                }`}
              >
                2x
              </button>
              <button
                onClick={() => setScaleOption('4x')}
                className={`flex-1 ${buttonBaseClasses} ${
                  scaleOption === '4x' ? primaryButtonClasses : secondaryButtonClasses
                }`}
              >
                4x
              </button>
            </div>

            <button
              onClick={handleUpscale}
              disabled={!selectedImage || !scaleOption}
              className={`w-full ${buttonBaseClasses} ${primaryButtonClasses}`}
            >
              Upscale
            </button>

            <div className="text-center text-xs text-gray-400">
              <div>Final size: 3000 X 4000</div>
              <div>Use 20 credits</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-4">
        <div className="flex-1 flex items-center justify-center max-h-[80%]">
          {upscaledImage || selectedImage ? (
            <img
              src={upscaledImage || selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-gray-400 text-center">
              <p>No image selected</p>
              <p className="text-sm">Upload an image to preview</p>
            </div>
          )}
        </div>
        <button
          disabled={!upscaledImage}
          className={`w-96 ${buttonBaseClasses} ${primaryButtonClasses}`}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Upscale;

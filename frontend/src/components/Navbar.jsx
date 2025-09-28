import React, { useState } from "react";
import { Chrome } from '@uiw/react-color';
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { Pencil, NotebookText, BookOpen } from "lucide-react"; // optional icons

// Accepts currentColor (Hex), setBodyColor, and setBodyAlpha
const Navbar = ({ currentColor, setBodyColor, setBodyAlpha }) => {
  const [showPicker, setShowPicker] = useState(false);
  
  const closePicker = () => {
    setShowPicker(false);
  };

  const handleChange = (newColor) => {
    if (setBodyColor) {
      // Update the main color with the HEX value
      // This ensures the color picker's main selector and hue slider work reliably.
      setBodyColor(newColor.hex);
    }
    
    if (setBodyAlpha && newColor.rgb.a !== undefined) {
        // Update the alpha/opacity state separately
        // This makes the opacity slider functional by saving its value (0 to 1)
        setBodyAlpha(newColor.rgb.a);
    }
  };

  return (
    <nav className="text-white bg-gray-800 w-screen relative z-30">
      <div className="md:mx-auto md:max-w-[80%] p-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-sans hover:scale-[1.02] transition-transform"
        >
          <div className="p-1.5 rounded-full bg-gradient-to-br from-lime-600 to-emerald-700">
            <div className="bg-gray-800 p-1.5 rounded-full">
              <NotebookText className="w-6 h-6 text-lime-400 animate-pulse [animation-duration:6s] drop-shadow-[0_0_6px_rgba(163,230,53,0.6)]" />
            </div>
          </div>
          <span className="text-2xl font-semibold text-slate-300">my</span>
          <span className="text-4xl font-extrabold skew-x-[-10deg] tracking-tight bg-gradient-to-r from-lime-400 via-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(34,197,94,0.4)]">
            NOTES
          </span>
        </Link>

        <div className="flex gap-3 items-center">
          <Link
            to="/create"
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-700/30 backdrop-blur text-lime-500 border border-lime-600 hover:bg-lime-600 hover:text-black transition duration-300 ease-in-out"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="hidden md:inline font-semibold">Create Note</span>
          </Link>

          <div className="relative">
            <button
              className="p-2 rounded bg-transparent text-white border border-transparent hover:border-lime-600 transition"
              onClick={() => setShowPicker(!showPicker)}
            >
              🎨 Theme
            </button>

            {/* Transparent overlay to handle clicking outside the picker to close it */}
            {showPicker && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={closePicker} 
                />
            )}

            {showPicker && (
              <div className="absolute z-50 mt-2 right-0">
                {/* Passing the simple currentColor (Hex) value */}
                <Chrome 
                    color={currentColor || '#0f172a'} 
                    onChange={handleChange} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

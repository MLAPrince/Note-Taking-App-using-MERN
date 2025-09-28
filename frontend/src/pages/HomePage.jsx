import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NotesNotFound from "../components/NotesNotFound";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import { LoaderIcon } from "lucide-react";


// Helper to convert an RGBA object back to a simple Hex string (stripping alpha)
// The color picker should still work fine with Hex even if it provides RGBA.
const formatRgbaToHex = (rgba) => {
    // If we only have the hex string, just return it.
    if (typeof rgba === 'string' && rgba.startsWith('#')) return rgba;
    
    // Simple logic to convert RGBA components to Hex
    const toHex = (c) => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0');
    
    return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
};


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Storing simple Hex color. This is more reliable for color pickers.
  const [bodyColor, setBodyColor] = useState('#0f172a');   
  
  // We'll add a separate state for alpha if we need true opacity control,
  // but for the picker to work, we focus on the Hex color.
  const [bodyAlpha, setBodyAlpha] = useState(1); // 1 = fully opaque

  useEffect(() => {
    // Applying the color and alpha separately to use the full RGBA value.
    document.body.style.backgroundColor = `rgba(${parseInt(bodyColor.slice(1, 3), 16)}, ${parseInt(bodyColor.slice(3, 5), 16)}, ${parseInt(bodyColor.slice(5, 7), 16)}, ${bodyAlpha})`;
    
    // Save both values to localStorage
    localStorage.setItem('bodyColor', bodyColor);
    localStorage.setItem('bodyAlpha', bodyAlpha);
    
  }, [bodyColor, bodyAlpha]); // Depend on both color and alpha

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        const data = response.data;
        setNotes(data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          console.log("Error in fetching notes", error);
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-lime-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="h-[80px] sticky top-0 left-0 z-50">
        <Navbar  
          // Pass the simple HEX color string as 'currentColor'.
          currentColor={bodyColor}
          // Pass the setter for color AND alpha.
          setBodyColor={setBodyColor}
          setBodyAlpha={setBodyAlpha}
        />
      </div>
      <div>{isRateLimited && <RateLimitedUI />}</div>
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {!isLoading && notes.length === 0 && <NotesNotFound/>}
        {!isLoading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[85vw] mx-auto my-auto">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

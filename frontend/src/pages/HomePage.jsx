import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NotesNotFound from "../components/NotesNotFound";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import { LoaderIcon } from "lucide-react";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        const data = response.data;
        setNotes(data);
        // console.log(data);
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
        <Navbar />
      </div>
      <div>{isRateLimited && <RateLimitedUI />}</div>
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* {isLoading && (<p className="text-center text-primary">Loading Notes...</p>)} */}
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

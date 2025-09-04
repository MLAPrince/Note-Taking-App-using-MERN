import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    if (e) { // Check if 'e' exists to prevent errors if called directly
      e.preventDefault();
    }
    setLoading(true);
    // Send the form data to the backend for processing
    if(!title || !content){
        toast.error("Please fill all the fields")
        setLoading(false)
    }
    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created!");
      navigate("/");

    } catch (error) {
      console.log("Error in creating note", error)
      if (error.response && error.response.status === 429) {
        toast.error("Too many clicks. Please try again later.");
      }
      else{
        toast.error("Failed to create note. Please try again later.");
      }
      
    }finally{
      setLoading(false)
    }
  };

useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the Enter key was pressed AND if no modifier keys (Ctrl, Alt, Shift) are down
      // This prevents unintended submissions if user means to create a new line (Shift+Enter)
      if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        // Prevent the default browser action (e.g., submitting a form if not handled)
        event.preventDefault();
        handleSubmit(); // Trigger the submit function
      }
    };
    // Add the event listener to the document
    document.addEventListener('keydown', handleKeyDown);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]); // Depend on handleSubmit to re-attach if it ever changes (though unlikely here)


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="md:max-w-2xl max-w-full mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-2xl shadow-lime-800">
            <div className="card-body">
              <h2 className="card-title text-2xl text-lime-500 mb-4 ml-1">
                Create New Note
              </h2>
              <form>
                <div className="w-[100%]  mb-2 h-[30px] px-2 content-center">
                  <input
                    type="text"
                    placeholder="Note Title"
                    className=" outline-none border-none h-[30px] text-[1.3rem] w-[100%] font-bold  caret-amber-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="separator-line h-[1px] bg-white opacity-30 mb-3"></div>
                <div className=" mb-4 w-[100%] h-36 px-2 ">
                  <textarea
                    placeholder="Start Typing your note..."
                    className="border-none outline-none text-[1rem] w-[100%] h-[100%] resize-none caret-amber-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn bg-lime-700 border-lime-700 text-black hover:bg-lime-900"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

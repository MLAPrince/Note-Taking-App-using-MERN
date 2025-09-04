import React, { use } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";


const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        const data = response.data;
        setNote(data);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch note. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Note will be deleted permanentaly!")) return;
    try {
      await api.delete(`/notes/${id}`);
      navigate("/");
      toast.success("Note deleted!")
    } catch (error) {
      console.log("Error in deleting note", error)
      toast.error("Failed to delete the note!")
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill all the fields")
      return
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated!");
      navigate("/");
    } catch (error) {
      console.log("Error in updating note", error)
      toast.error("Failed to update the note!")
    } finally {
      setSaving(false);
    }
  }

 useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the Enter key was pressed AND if no modifier keys (Ctrl, Alt, Shift) are down
      if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
        // Prevent default behavior (e.g., submitting a form if the button is inside one)
        // event.preventDefault();
        handleSave();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSave]); // Re-run effect if handleSave changes (though in this case it's stable)


  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-lime-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="md:max-w-2xl max-w-full mx-auto ">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button className="btn btn-error btn-outline mr-2" onClick={handleDelete}>
              <Trash2Icon className="h-4 w-4" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100 shadow-2xl shadow-lime-800">
            <div className="card-body">
              <h2 className="card-title text-2xl text-lime-500 mb-4 ml-1">
                Edit Note
              </h2>
              <form>
                <div className="w-[100%]  mb-2 h-[30px] px-2 content-center">
                  <input
                    type="text"
                    placeholder="Note Title"
                    className=" outline-none border-none h-[30px] text-[1.3rem] w-[100%] font-bold  caret-amber-500"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                </div>
                <div className="separator-line h-[1px] bg-white opacity-30 mb-3"></div>
                <div className=" mb-4 w-[100%] h-36 px-2 ">
                  <textarea
                    placeholder="Start Typing your note..."
                    className="border-none outline-none text-[1rem] w-[100%] h-[100%] resize-none caret-amber-500"
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn bg-lime-700 border-lime-700 text-black hover:bg-lime-900"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage

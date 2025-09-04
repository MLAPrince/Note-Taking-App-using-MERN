import React from "react";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
// import { formatDate } from "../lib/utils";
import { formatNoteTimestamp } from "../lib/dateUtils"; // Import the function from the us";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const formattedTimestamp = formatNoteTimestamp(
    note.createdAt,
    note.updatedAt
  );

  const characterCount = note && note.content ? note.content.length : 0;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Note will be deleted permanentaly!")) return;
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter(n => n._id !== note._id));
      toast.success("Note deleted!")
    } catch (error) {
      console.log("Error in deleting note", error)
      toast.error("Failed to delete the note!")
    }
  };


  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg hover:shadow-lime-700 shadow-2xl shadow-gray-800 transition-all duration-200 
      border-t-4 border-[#7bff008e] card-3D"
      //   className="card bg-base-100 hover:shadow-lg transition-all duration-200
      //   border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-xl text-white opacity-90">
          {note.title}
        </h3>
        <span className=" ml-0 text-sm text-base-content/60">
          {formattedTimestamp}
        </span>
        <p className="text-white line-clamp-3 opacity-90">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {characterCount} characters
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4 hover:-scale-110 transition-all duration-300" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4 hover:-scale-110 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;

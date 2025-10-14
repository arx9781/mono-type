import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!", {
        style: {
          background: "#0a0a0a",
          color: "#cfcfcf",
          border: "1px solid #4ade80",
        },
      });
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete note", {
        style: {
          background: "#0a0a0a",
          color: "#cfcfcf",
          border: "1px solid #ff4d6d",
        },
      });
    }
  };

  return (
    <>
      <Link
        to={`/note/${note._id}`}
        className="card bg-primary border border-base-content/10 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:-translate-y-1"
      >
        <div className="card-body">
          <h3 className="card-title text-base-content truncate">
            {note.title}
          </h3>
          <p className="text-base-content/70 line-clamp-4">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60 font-mono">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

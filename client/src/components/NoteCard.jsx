import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";

export const NoteCard = ({ note }) => {
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
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60 font-mono">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button className="btn btn-ghost btn-xs text-error">
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

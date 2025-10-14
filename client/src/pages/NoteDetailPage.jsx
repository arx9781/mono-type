import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

export const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        if (res.data.success && res.data.data) {
          setNote(res.data.data);
        } else {
          console.error("Unexpected data format:", res.data);
          toast.error("Unexpected data format from server", {
            style: {
              background: "#0a0a0a",
              color: "#cfcfcf",
              border: "1px solid #ff4d6d",
            },
          });
        }
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note", {
          style: {
            background: "#0a0a0a",
            color: "#cfcfcf",
            border: "1px solid #ff4d6d",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted", {
        style: {
          background: "#0a0a0a",
          color: "#cfcfcf",
          border: "1px solid #4ade80",
        },
      });
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note", {
        style: {
          background: "#0a0a0a",
          color: "#cfcfcf",
          border: "1px solid #ff4d6d",
        },
      });
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content", {
        style: {
          background: "#0a0a0a",
          color: "#cfcfcf",
          border: "1px solid #ff4d6d",
        },
      });
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully", {
        style: {
          background: "#0a0a0a",
          color: "#cfcfcf",
          border: "1px solid #4ade80",
        },
      });
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note", {
        style: {
          background: "#0a0a0a",
          color: "#cfcfcf",
          border: "1px solid #ff4d6d",
        },
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-md text-secondary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto py-4">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/" className="btn btn-outline ml-[30px]">
              <ArrowLeftIcon className="size-5" />
              Back to home
            </Link>
            <div className="flex">
              <button onClick={handleDelete} className="btn btn-error">
                <Trash2Icon className="size-4" />
                Delete
              </button>
            </div>
          </div>

          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  className="input input-bordered placeholder:text-base-content/50"
                  placeholder="Note Title"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                  className="textarea textarea-bordered h-96 placeholder:text-base-content/50"
                  placeholder="Your note content here..."
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  onClick={handleSave}
                  className="btn btn-secondary"
                  disabled={saving}
                >
                  {saving ? (
                    <div>
                      <span className="loading loading-spinner loading-sm text-secondary"></span>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

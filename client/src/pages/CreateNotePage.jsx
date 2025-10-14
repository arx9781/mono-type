import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router";
import { api } from "../lib/axios";

export const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required", {
        style: {
          background: "#0a0a0a",
          color: "#cfcfcf",
          border: "1px solid #ff4d6d",
        },
      });
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!", {
        style: {
          background: "#0a0a0a",
          color: "#cfcfcf",
          border: "1px solid #4ade80",
        },
      });
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      toast.error("Failed to create note", {
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

  return (
    <div className="min-h-screen bg-base-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto py-4">
          <Link to={"/"} className="btn btn-outline mb-6 ml-[30px]">
            <ArrowLeftIcon className="size-5" />
            Back to home
          </Link>

          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create a new note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered placeholder:text-base-content/50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Your note content here..."
                    className="textarea textarea-bordered h-96 placeholder:text-base-content/50"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div>
                        <span className="loading loading-spinner loading-sm text-secondary"></span>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Create Note"
                    )}
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

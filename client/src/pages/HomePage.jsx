import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { RateLimitedNotif } from "../components/RateLimitedNotif";
import { NoteCard } from "../components/NoteCard";

import { api } from "../lib/axios";
import toast from "react-hot-toast";
import { CircleAlertIcon } from "lucide-react";

export const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        if (res.data.success && Array.isArray(res.data.data)) {
          setNotes(res.data.data);
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
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes.", {
            style: {
              background: "#0a0a0a",
              color: "#cfcfcf",
              border: "1px solid #ff4d6d",
            },
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <Navbar />
      {isRateLimited && <RateLimitedNotif />}

      <main className="flex-1 max-w-6xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-md text-secondary"></span>
            <span className="ml-4 text-secondary text-lg">
              Loading notes...
            </span>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <div className="flex items-center gap-2">
              <CircleAlertIcon className="size-4 text-error" />
              <p className="text-base-content/70 font-semibold">
                No notes found.
              </p>
            </div>
            <p className="text-base-content/50">
              Create your first note to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

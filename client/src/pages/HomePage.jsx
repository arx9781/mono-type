import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { RateLimitedNotif } from "../components/RateLimitedNotif";
import { NoteCard } from "../components/NoteCard";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        if (res.data.success && Array.isArray(res.data.data)) {
          setNotes(res.data.data);
        } else {
          console.error("Unexpected data format:", res.data);
          toast.error("Unexpected data format from server");
        }
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-300">
      <Navbar />
      {isRateLimited && <RateLimitedNotif />}

      <div className="max-w-6xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="text-secondary py-10 text-center">Loading...</div>
        ) : notes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-base-content/70">
              No notes found. Create your first note!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

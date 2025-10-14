import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { NoteDetailPage } from "./pages/NoteDetailPage";
import { CreateNotePage } from "./pages/CreateNotePage";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="vercel">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/create" element={<CreateNotePage />} />
      </Routes>
    </div>
  );
};

export default App;

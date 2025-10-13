import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreateNotePage from "./pages/CreateNotePage";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="black">
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/create" element={<CreateNotePage />} />
      </Routes>
    </div>
  );
};

export default App;

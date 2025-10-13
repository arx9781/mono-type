import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

export const Navbar = () => {
  return (
    <header>
      <div className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-secondary font-mono tracking-tighter">
              Monotype/
            </h1>
            <div className="flex items-center gap-4">
              <Link to="/create" className="btn btn-secondary">
                <PlusIcon className="size-5" />
                <span>Create</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

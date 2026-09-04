import { Link, useLocation } from "react-router-dom";
import { Scale } from "lucide-react";
import { cn } from "../lib/utils";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <Scale className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-slate-900">Legality</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full border border-blue-200">
              Legal AI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            <Link
              to="/"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === "/"
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              Home
            </Link>
            <Link
              to="/translate"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === "/translate"
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              Translate
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/translate"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors shadow-sm"
          >
            Launch App
          </Link>
        </div>
      </div>
    </header>
  );
}

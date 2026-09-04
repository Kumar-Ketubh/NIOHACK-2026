import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Translate from "./pages/Translate";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/translate" element={<Translate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

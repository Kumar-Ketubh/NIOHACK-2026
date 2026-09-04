import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ResultViewer from "../components/ResultViewer";
import { ArrowRightLeft, HelpCircle, ChevronDown, Lock } from "lucide-react";

export default function Translate() {
  const [status, setStatus] = useState("idle"); // idle, uploading, translating, done
  const [file, setFile] = useState(null);
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Chinese (Simplified)");
  const [docType, setDocType] = useState("Standard");

  const handleFileDrop = (droppedFile) => {
    setFile(droppedFile);
  };

  const handleTranslate = () => {
    if (!file) return;
    setStatus("translating");
    // Simulate API call
    setTimeout(() => {
      setStatus("done");
    }, 2500);
  };

  const resetWorkspace = () => {
    setStatus("idle");
    setFile(null);
  };

  if (status === "done") {
    return <ResultViewer onReset={resetWorkspace} sourceLang={sourceLang} targetLang={targetLang} fileName={file?.name} />;
  }

  return (
    <div className="flex-1 bg-white">
      {status === "translating" ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-slate-900 rounded-full animate-[progress_2.5s_ease-in-out_forwards]" style={{ width: "0%" }}></div>
          </div>
          <p className="text-slate-600 font-medium">Translating your document...</p>
          <p className="text-sm text-slate-400 mt-2">Preserving formatting and legal clauses.</p>
          
          <style>{`
            @keyframes progress {
              0% { width: 0%; }
              50% { width: 70%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-slate-900 mb-3">
              Translate your documents with formatting intact in 2 minutes
            </h1>
            <p className="text-slate-500 text-lg">
              Upload your documents and get high-quality translation in 120+ languages with the same format
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Card: Upload Document */}
            <div className="border border-slate-100 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-slate-900">Upload Document</h2>
                <span className="bg-cyan-50 text-cyan-600 text-xs font-medium px-3 py-1 rounded-full">
                  5 Free Pages
                </span>
              </div>
              <Dropzone onFileDrop={handleFileDrop} selectedFile={file} onRemove={() => setFile(null)} />
            </div>

            {/* Right Card: Settings */}
            <div className="border border-slate-100 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-white flex flex-col">
              <h2 className="text-lg font-medium text-slate-900 mb-6">Choose your language</h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-sm text-slate-600 mb-1.5">Source:</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                    >
                      <option>Auto Detect</option>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <button 
                  className="mt-6 w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center border border-slate-200 transition-colors shrink-0"
                  onClick={() => {
                    if(sourceLang !== "Auto Detect") {
                      const temp = sourceLang;
                      setSourceLang(targetLang);
                      setTargetLang(temp);
                    }
                  }}
                >
                  <ArrowRightLeft className="w-4 h-4 text-slate-500" />
                </button>

                <div className="flex-1">
                  <label className="block text-sm text-slate-600 mb-1.5">Target:</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                    >
                      <option>Chinese (Simplified)</option>
                      <option>English</option>
                      <option>Spanish (Civil Law)</option>
                      <option>German (Civil Law)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-1 text-sm text-slate-600 mb-1.5">
                  Translation engine: <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <div className="relative">
                  <select className="w-full appearance-none border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900">
                    <option>Legality Legal LLM</option>
                    <option>GPT-4o (General)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-2 mb-6">
                <label className="block text-sm text-slate-600 mb-2 px-2 pt-1">Document Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setDocType("Standard")}
                    className={`py-2 px-3 text-xs md:text-sm rounded-lg transition-colors border ${docType === "Standard" ? "bg-white border-slate-900 text-slate-900 font-medium shadow-sm" : "bg-transparent border-transparent text-slate-500 hover:text-slate-700"}`}
                  >
                    Standard
                  </button>
                  <button 
                    onClick={() => setDocType("Scanned")}
                    className={`py-2 px-3 text-xs md:text-sm rounded-lg transition-colors border flex items-center justify-center gap-1 ${docType === "Scanned" ? "bg-white border-slate-900 text-slate-900 font-medium shadow-sm" : "bg-transparent border-transparent text-slate-500 hover:text-slate-700"}`}
                  >
                    Scanned (OCR) <HelpCircle className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setDocType("Image")}
                    className={`py-2 px-3 flex flex-col items-center justify-center rounded-lg transition-colors border ${docType === "Image" ? "bg-white border-slate-900 text-slate-900 font-medium shadow-sm" : "bg-transparent border-transparent text-slate-500 hover:text-slate-700"}`}
                  >
                    <span className="text-xs md:text-sm leading-tight">Image Translation</span>
                    <span className="text-[10px] text-slate-400">5X credits</span>
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  <ChevronDown className="w-4 h-4" /> Advanced settings
                </button>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <button
                  onClick={handleTranslate}
                  disabled={!file}
                  className={`w-full py-3.5 rounded-full font-medium transition-colors ${
                    file 
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md" 
                      : "bg-gray-400/80 text-white cursor-not-allowed"
                  }`}
                >
                  Translate files
                </button>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Lock className="w-3 h-3" />
                    <span>Your file is protected with end to end encryption and automatically deleted after translation.</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Read Legality's <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a> to see how Legality handles your file.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ResultViewer from "../components/ResultViewer";
import { ArrowRightLeft, HelpCircle, ChevronDown, Lock } from "lucide-react";

export default function Translate() {
  const [status, setStatus] = useState("idle"); // idle, translating, done, error
  const [file, setFile] = useState(null);
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Hindi");
  const [docType, setDocType] = useState("Standard");
  const [translationResult, setTranslationResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileDrop = (droppedFile) => {
    setFile(droppedFile);
  };

  const handleTranslate = async () => {
    if (!file) return;
    setStatus("translating");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("source_lang", sourceLang);
      formData.append("target_lang", targetLang);

      const res = await fetch("/api/translate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(err.detail || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setTranslationResult(data);
      setStatus("done");
    } catch (err) {
      console.error("Translation failed:", err);
      setErrorMsg(err.message || "Translation failed. Check the backend console.");
      setStatus("error");
    }
  };

  const resetWorkspace = () => {
    setStatus("idle");
    setFile(null);
    setTranslationResult(null);
    setErrorMsg("");
  };

  if (status === "done" && translationResult) {
    return (
      <ResultViewer
        onReset={resetWorkspace}
        sourceLang={sourceLang}
        targetLang={targetLang}
        fileName={file?.name}
        clauses={translationResult.clauses}
        pdfDownloadId={translationResult.pdf_download_id}
      />
    );
  }

  return (
    <div className="flex-1 bg-white">
      {status === "translating" ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-slate-900 rounded-full animate-pulse" style={{ width: "60%" }}></div>
          </div>
          <p className="text-slate-600 font-medium">Translating your document...</p>
          <p className="text-sm text-slate-400 mt-2">This may take a few minutes for multi-page documents.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-slate-900 mb-3">
              Translate your documents with formatting intact
            </h1>
            <p className="text-slate-500 text-lg">
              Upload your legal PDF and get an AI-powered Hindi translation preserving layout
            </p>
          </div>

          {status === "error" && (
            <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
              <strong>Translation failed:</strong> {errorMsg}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Card: Upload Document */}
            <div className="border border-slate-100 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-slate-900">Upload Document</h2>
                <span className="bg-cyan-50 text-cyan-600 text-xs font-medium px-3 py-1 rounded-full">
                  PDF Only
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
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <button
                  className="mt-6 w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center border border-slate-200 transition-colors shrink-0"
                  onClick={() => {
                    const temp = sourceLang;
                    setSourceLang(targetLang);
                    setTargetLang(temp);
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
                      <option>Hindi</option>
                      <option>English</option>
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
                    <option>Legality Legal LLM (Gemini 2.5 Flash)</option>
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
                  </button>
                </div>
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
                    <span>Your file is processed locally and never leaves this machine.</span>
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

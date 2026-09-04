import { Download, Copy, RotateCcw, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ResultViewer({
  onReset,
  sourceLang,
  targetLang,
  fileName,
  clauses = [],
  pdfDownloadId,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const allTranslated = clauses.map((c) => c.translated).join("\n\n");
    navigator.clipboard.writeText(allTranslated).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPDF = () => {
    if (pdfDownloadId) {
      window.open(`/api/download/${pdfDownloadId}`, "_blank");
    }
  };

  // Group clauses by page
  const pageMap = {};
  clauses.forEach((clause) => {
    const p = clause.page || 1;
    if (!pageMap[p]) pageMap[p] = [];
    pageMap[p].push(clause);
  });
  const sortedPages = Object.keys(pageMap)
    .map(Number)
    .sort((a, b) => a - b);
  const totalPages = sortedPages.length;

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      {/* Control Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-medium text-slate-900 truncate max-w-md">
            {fileName || "Document.pdf"}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Translation Complete
            </span>
            <span>•</span>
            <span>
              {sourceLang} → {targetLang}
            </span>
            <span>•</span>
            <span>{clauses.length} segments</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied" : "Copy Text"}
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={!pdfDownloadId}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${
              pdfDownloadId
                ? "text-white bg-blue-600 hover:bg-blue-700"
                : "text-slate-400 bg-slate-100 cursor-not-allowed"
            }`}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>

          <div className="w-px h-6 bg-slate-200 mx-2"></div>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Translate Another File
          </button>
        </div>
      </div>

      {/* Split Pane Viewer */}
      <div className="flex-1 flex overflow-hidden">
        {/* Original */}
        <div className="flex-1 flex flex-col border-r border-slate-200 bg-white overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between shrink-0">
            <span>Original ({sourceLang})</span>
            <span>{totalPages} page{totalPages !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-2xl mx-auto space-y-4 font-serif text-slate-800 leading-relaxed text-[15px]">
              {sortedPages.map((pageNum) => (
                <div key={`orig-${pageNum}`}>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1">
                    Page {pageNum}
                  </div>
                  {pageMap[pageNum].map((clause) => (
                    <p key={clause.id} className="mb-3 whitespace-pre-wrap">
                      {clause.original}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Translation */}
        <div className="flex-1 flex flex-col bg-[#FDFDFD] overflow-hidden">
          <div className="px-4 py-2 bg-blue-50/50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-blue-600 flex justify-between shrink-0">
            <span>Translation ({targetLang})</span>
            <span>{totalPages} page{totalPages !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex-1 overflow-auto p-8 selection:bg-blue-100">
            <div className="max-w-2xl mx-auto space-y-4 font-serif text-slate-900 leading-relaxed text-[15px]">
              {sortedPages.map((pageNum) => (
                <div key={`trans-${pageNum}`}>
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3 border-b border-blue-100 pb-1">
                    Page {pageNum}
                  </div>
                  {pageMap[pageNum].map((clause) => (
                    <p key={clause.id} className="mb-3 whitespace-pre-wrap">
                      {clause.translated}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

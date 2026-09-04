import { Download, Copy, RotateCcw, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ResultViewer({ onReset, sourceLang, targetLang, fileName }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      {/* Control Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-medium text-slate-900 truncate max-w-md">
            {fileName || "Document.pdf"}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-2">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Translation Complete</span>
            <span>•</span>
            <span>{sourceLang} to {targetLang}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy Text"}
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Download (.docx)
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
            <span>Page 1 / 4</span>
          </div>
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-2xl mx-auto space-y-6 font-serif text-slate-800 leading-relaxed text-[15px]">
              <div className="text-center font-bold text-lg mb-8 uppercase tracking-widest">
                Non-Disclosure Agreement
              </div>
              <p>
                This Non-Disclosure Agreement (the "Agreement") is entered into as of this day, by and between the parties, for the purpose of preventing the unauthorized disclosure of Confidential Information as defined below.
              </p>
              <h3 className="font-bold text-base mt-6">1. DEFINITION OF CONFIDENTIAL INFORMATION</h3>
              <p>
                For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged.
              </p>
              <h3 className="font-bold text-base mt-6">2. EXCLUSIONS FROM CONFIDENTIAL INFORMATION</h3>
              <p>
                Receiving Party's obligations under this Agreement do not extend to information that is: (a) publicly known at the time of disclosure or subsequently becomes publicly known through no fault of the Receiving Party...
              </p>
            </div>
          </div>
        </div>

        {/* Translation */}
        <div className="flex-1 flex flex-col bg-[#FDFDFD] overflow-hidden">
          <div className="px-4 py-2 bg-blue-50/50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-blue-600 flex justify-between shrink-0">
            <span>Translation ({targetLang})</span>
            <span>Page 1 / 4</span>
          </div>
          <div className="flex-1 overflow-auto p-8 selection:bg-blue-100">
            <div className="max-w-2xl mx-auto space-y-6 font-serif text-slate-900 leading-relaxed text-[15px]">
              <div className="text-center font-bold text-lg mb-8 uppercase tracking-widest">
                保密协议
              </div>
              <p>
                本保密协议（“协议”）由双方于今日签订，旨在防止未经授权披露下文定义的保密信息。
              </p>
              <h3 className="font-bold text-base mt-6">1. 保密信息的定义</h3>
              <p>
                就本协议而言，“保密信息”应包括在披露方从事的业务中具有或可能具有商业价值或其他效用的所有信息或材料。
              </p>
              <h3 className="font-bold text-base mt-6">2. 保密信息的排除条款</h3>
              <p>
                接收方在本协议项下的义务不延伸至以下信息：(a) 在披露时已公开或随后非因接收方的过错而公开的信息...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

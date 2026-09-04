import { Upload, File, X, Info } from "lucide-react";

export default function Dropzone({ onFileDrop, selectedFile, onRemove }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileDrop(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileDrop(e.target.files[0]);
    }
  };

  if (selectedFile) {
    return (
      <div className="w-full h-[320px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 bg-slate-50 relative">
        <div className="w-full max-w-sm bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <File className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Est. 4 pages
            </p>
          </div>
          <button
            onClick={onRemove}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-6 flex items-center gap-1">
          Files processed in memory
        </p>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-full h-[320px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 transition-colors hover:border-slate-300 hover:bg-slate-50 cursor-pointer group relative"
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileInput}
        accept=".pdf,.docx,.txt"
      />
      <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
        <div className="w-16 h-16 bg-slate-100 group-hover:bg-slate-200 rounded-full flex items-center justify-center mb-6 transition-colors">
          <Upload className="w-7 h-7 text-slate-700" />
        </div>
        
        <h3 className="text-[17px] font-medium text-slate-900 mb-2">
          Drag and drop your file here to start translating
        </h3>
        
        <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-8">
          Upload up to 100MB in file size! <Info className="w-4 h-4 text-slate-400" />
        </p>
        
        <div className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full shadow-md hover:bg-slate-800 transition-colors">
          Upload document
        </div>
      </label>
    </div>
  );
}

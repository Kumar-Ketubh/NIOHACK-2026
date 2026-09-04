import { Link } from "react-router-dom";
import { ArrowRight, FileText, Globe2, ShieldCheck, ArrowRightLeft } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container relative mx-auto px-4 text-center z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Enterprise-grade legal document translation
              <span className="block text-blue-600">preserving formatting & clauses.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Achieve jurisdiction precision in seconds. Our AI ensures your contracts, NDAs, and court filings retain their exact layout and legal dialect across 120+ languages.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/translate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                Translate a Document Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Secondary Visual: Mock Translation Preview */}
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="glass rounded-2xl p-2 bg-white/40 shadow-xl border border-white/50 backdrop-blur-xl">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
                {/* Original */}
                <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 text-left">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Source: English</span>
                  </div>
                  <div className="space-y-4 font-serif text-slate-800 leading-relaxed text-sm md:text-base">
                    <h3 className="font-bold text-lg">1. CONFIDENTIAL INFORMATION</h3>
                    <p>
                      "Confidential Information" means all non-public information disclosed by one party to the other party, whether disclosed orally or disclosed or accessed in written, electronic or other form or media...
                    </p>
                  </div>
                </div>
                {/* Translation */}
                <div className="flex-1 p-6 md:p-8 bg-blue-50/30 text-left relative overflow-hidden">
                  <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm z-10 hidden md:flex">
                    <ArrowRightLeft className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">Target: Spanish (Civil Law)</span>
                  </div>
                  <div className="space-y-4 font-serif text-slate-800 leading-relaxed text-sm md:text-base">
                    <h3 className="font-bold text-lg">1. INFORMACIÓN CONFIDENCIAL</h3>
                    <p>
                      "Información Confidencial" significa toda la información no pública revelada por una parte a la otra, ya sea revelada oralmente o revelada o accedida en forma o medio escrito, electrónico u otro...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Format Preservation</h3>
              <p className="text-slate-600 leading-relaxed">
                Upload PDF, Word, or Scans. Our AI extracts text while strictly maintaining your document's original layout, tables, and typography.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Legal Dialect Accuracy</h3>
              <p className="text-slate-600 leading-relaxed">
                Powered by a specialized LLM trained on multilingual jurisprudence, ensuring appropriate legal terminology and jurisdictional nuance.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Confidential Processing</h3>
              <p className="text-slate-600 leading-relaxed">
                Enterprise-grade security. Files are processed entirely in memory, encrypted end-to-end, and immediately destroyed after translation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { TemplateProps } from "@/lib/archetypeMap";

export function GenericTemplate({ clientData }: TemplateProps) {
  const primaryColor =
    clientData.colors?.primary || clientData.primaryColor || "#64748B";
  const accentColor =
    clientData.colors?.accent || clientData.accentColor || "#94A3B8";

  return (
    <div
      className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between"
      style={
        {
          "--theme-primary": primaryColor,
          "--theme-accent": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Generic Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/40 backdrop-blur px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-medium">
              Standard Business Prototype
            </span>
          </div>
          {clientData.phone && (
            <a
              href={`tel:${clientData.phone.replace(/[^0-9+]/g, "")}`}
              className="text-xs font-mono bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-md font-semibold transition-colors"
            >
              Contact: {clientData.phone}
            </a>
          )}
        </div>
      </header>

      {/* Main Shell Container */}
      <main className="max-w-5xl mx-auto p-10 text-center my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono uppercase tracking-wider mb-6">
          <span>Archetype: Generic</span>
          <span>•</span>
          <span>Niche: {clientData.industry || "General Commercial"}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Generic Template
        </h1>

        <p className="text-xl md:text-2xl text-slate-200 font-medium mb-2">
          {clientData.company}
        </p>

        <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">
          General business layout shell for unclassified or emerging service
          categories.
        </p>

        {/* Client Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left bg-slate-900/60 border border-slate-800 rounded-xl p-5 mb-8">
          <div>
            <span className="text-xs text-slate-500 uppercase font-mono block">
              Classification
            </span>
            <span className="text-sm font-semibold text-slate-200">
              {clientData.industry || "General Commercial"}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-mono block">
              Region
            </span>
            <span className="text-sm font-semibold text-slate-200">
              {clientData.city || "Regional Office"}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-mono block">
              Layout State
            </span>
            <span className="text-sm font-semibold text-slate-400">
              Default Adaptive
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3.5 rounded-lg text-base shadow-lg transition-all hover:scale-105">
            Request Information
          </button>
          {clientData.phone && (
            <a
              href={`tel:${clientData.phone.replace(/[^0-9+]/g, "")}`}
              className="px-6 py-3.5 rounded-lg text-base font-medium text-slate-300 border border-slate-700 hover:border-slate-500 transition-colors"
            >
              Call {clientData.phone}
            </a>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-600">
        <p>
          {clientData.company} • Standard Adaptive Prototype Shell
        </p>
      </footer>
    </div>
  );
}

export default GenericTemplate;

import { ChangeEvent, useState } from "react";
import { Search, Plus, FolderOpen, MoreHorizontal, Download, Trash2 } from "lucide-react";
import { folders, files } from "../types";
import { toast } from "sonner";

// ─── Doc card ─────────────────────────────────────────────────────────────────

interface DocCardProps {
  thumbnail: string;
  name: string;
  size: string;
  date: string;
  typeOfDoc: string;
}

const DocCard = ({ thumbnail, name, size, date, typeOfDoc }: DocCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="doc-card relative">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wide">
          {typeOfDoc}
        </span>
        <div className="relative">
          <button
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
            aria-label="File options"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-7 z-20 bg-white dark:bg-darkCard border border-slate-100 dark:border-slate-800 rounded-xl shadow-card-hover p-1 min-w-[130px]">
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  onClick={() => { toast.info("Download started"); setMenuOpen(false); }}
                >
                  <Download className="w-3 h-3" /> Download
                </button>
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                  onClick={() => { toast.error("Delete not available in demo"); setMenuOpen(false); }}
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Icon */}
      <div className="flex flex-col items-center gap-1">
        <img src={thumbnail} alt={typeOfDoc} className="h-9 w-9 object-contain" />
        <p className="text-xs text-center text-slate-700 dark:text-slate-300 leading-tight line-clamp-2">
          {name}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
        <span>{size}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const FileManager = () => {
  const [filter, setFilter]         = useState("");
  const [search, setSearch]         = useState("");
  const [showAllFolders, setShowAllFolders] = useState(false);
  const [showAllFiles, setShowAllFiles]     = useState(false);

  const DEFAULT_FOLDERS = 6;
  const DEFAULT_FILES   = 12;

  const matchFilter = (type: string) => !filter || type === filter;
  const matchSearch = (name: string) =>
    !search || name.toLowerCase().includes(search.toLowerCase());

  const filteredFolders = folders.filter(
    (f) => matchFilter(f.filterType) && matchSearch(f.name)
  );
  const filteredFiles = files.filter(
    (f) => matchFilter(f.filterType) && matchSearch(f.name)
  );

  const visibleFolders = showAllFolders ? filteredFolders : filteredFolders.slice(0, DEFAULT_FOLDERS);
  const visibleFiles   = showAllFiles   ? filteredFiles   : filteredFiles.slice(0, DEFAULT_FILES);

  return (
    <div className="page-section flex flex-col gap-6">
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <h2 className="page-heading">File Manager</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">{folders.length}</span> folders
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">{files.length}</span> files
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search files…"
              className="form-input pl-9 py-1.5 w-44 text-xs"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="form-select py-1.5 text-xs w-auto"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="shared">Shared</option>
            <option value="updated">Updated</option>
            <option value="added">Added</option>
          </select>

          {/* New file */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => toast.info("File upload coming soon")}
          >
            <Plus className="w-3.5 h-3.5" />
            New file
          </button>
        </div>
      </div>

      {/* ── Folders ──────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-title flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-amber-500" />
            Folders
            <span className="text-xs font-normal text-slate-400">({filteredFolders.length})</span>
          </h3>
          {filteredFolders.length > DEFAULT_FOLDERS && (
            <button
              className="text-xs text-buttonGreen dark:text-[#A9F2F6] hover:underline font-medium"
              onClick={() => setShowAllFolders((v) => !v)}
            >
              {showAllFolders ? "Show less" : `See all (${filteredFolders.length})`}
            </button>
          )}
        </div>

        {visibleFolders.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">No folders match your search</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {visibleFolders.map((f, i) => (
              <DocCard key={`folder-${i}`} {...f} />
            ))}
          </div>
        )}
      </div>

      {/* ── Recent files ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-title">
            Recent Files
            <span className="text-xs font-normal text-slate-400 ml-2">({filteredFiles.length})</span>
          </h3>
          {filteredFiles.length > DEFAULT_FILES && (
            <button
              className="text-xs text-buttonGreen dark:text-[#A9F2F6] hover:underline font-medium"
              onClick={() => setShowAllFiles((v) => !v)}
            >
              {showAllFiles ? "Show less" : `See all (${filteredFiles.length})`}
            </button>
          )}
        </div>

        {visibleFiles.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">No files match your search</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {visibleFiles.map((f, i) => (
              <DocCard key={`file-${i}`} {...f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;

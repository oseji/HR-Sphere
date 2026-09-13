import { useEffect, useRef, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { AppProvider, useApp } from "../context/AppContext";

import LoginPage from "./LoginPage";
import Menu from "./Menu";
import Overview from "./Overview";
import Employees from "./Employees";
import Performance from "./Performance";
import Payroll from "./Payroll";
import FileManager from "./FileManager";
import Schedule from "./Schedule";

import searchIcon from "../assets/circum_search.png";
import avatar from "../assets/esther.png";
import menuIcon from "../assets/menu.svg";
import closeMenu from "../assets/closeMenu.svg";
import { Logo } from "../components/Logo";

// ─── Dashboard shell ──────────────────────────────────────────────────────────

function DashboardShell() {
  const { admin, employeesLoading } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const history = useHistory();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Mobile sidebar: Escape closes and returns focus; lock body scroll while open
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    history.push(q ? `/employees?q=${encodeURIComponent(q)}` : "/employees");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header>
        <div className="flex items-center gap-4">
          {/* Mobile sidebar toggle */}
          <button
            ref={toggleRef}
            className="lg:hidden btn-icon"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={sidebarOpen}
            aria-controls="sidebar-nav"
          >
            <img src={sidebarOpen ? closeMenu : menuIcon} alt="" className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7 text-slate-900 dark:text-[#A9F2F6]" />
            <span className="font-bold text-slate-900 dark:text-white text-base hidden md:block">
              HR Sphere
            </span>
          </div>
        </div>

        {/* Search */}
        <form className="header-search" role="search" onSubmit={submitSearch}>
          <img src={searchIcon} alt="" className="h-4 w-4 opacity-60" />
          <input
            type="search"
            placeholder="Search employees…"
            aria-label="Search employees"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-500 dark:placeholder:text-slate-400 text-sm w-full"
          />
        </form>

        {/* Profile */}
        <div className="flex items-center gap-3">
          {employeesLoading && <span className="spinner" aria-label="Loading" />}
          <div className="flex items-center gap-2.5">
            <img
              src={avatar}
              alt=""
              className="w-8 h-8 rounded-full object-cover ring-2 ring-faintGreen dark:ring-darkModeGreen"
            />
            <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
              {admin || "Admin"}
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 relative">
        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <Menu sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-content" className="flex flex-1 min-w-0" tabIndex={-1}>
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>
          <Route path="/employees">
            <Employees />
          </Route>
          <Route path="/performance">
            <Performance />
          </Route>
          <Route path="/payroll">
            <Payroll />
          </Route>
          <Route path="/files">
            <FileManager />
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          {/* Legacy capitalized routes */}
          <Redirect from="/Employees" to="/employees" />
          <Redirect from="/Performance" to="/performance" />
          <Redirect from="/Payroll" to="/payroll" />
          <Redirect from="/FileManager" to="/files" />
        </Switch>
        </main>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function AppInner() {
  const { isLoggedIn } = useApp();
  return isLoggedIn ? <DashboardShell /> : <LoginPage />;
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Toaster
          position="top-right"
          richColors
          toastOptions={{ duration: 3500 }}
        />
        <AppInner />
        <SpeedInsights framework="react" />
      </div>
    </AppProvider>
  );
}

export default App;

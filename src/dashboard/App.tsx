import { useState } from "react";
import { Route, Switch } from "react-router-dom";
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
import logo from "../assets/logo.png";

// ─── Dashboard shell ──────────────────────────────────────────────────────────

function DashboardShell() {
  const { admin, employeesLoading } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header>
        <div className="flex items-center gap-4">
          {/* Mobile sidebar toggle */}
          <button
            className="lg:hidden btn-icon"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            <img src={sidebarOpen ? closeMenu : menuIcon} alt="" className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="HR Sphere" className="h-7 w-7" />
            <span className="font-bold text-slate-900 dark:text-white text-base hidden md:block">
              HR Sphere
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="header-search">
          <img src={searchIcon} alt="" className="h-4 w-4 opacity-50" />
          <input
            type="text"
            placeholder="Search employees, reports…"
            className="bg-transparent outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm w-full"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          {employeesLoading && <span className="spinner" aria-label="Loading" />}
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <img
              src={avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-buttonGreen/30 transition"
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
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Menu sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
          <Route path="/Employees">
            <Employees />
          </Route>
          <Route path="/Performance">
            <Performance />
          </Route>
          <Route path="/Payroll">
            <Payroll />
          </Route>
          <Route path="/FileManager">
            <FileManager />
          </Route>
        </Switch>
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

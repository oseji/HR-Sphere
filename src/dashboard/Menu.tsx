import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  DollarSign,
  FolderOpen,
  Calendar,
  HelpCircle,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ConfirmModal } from "../components/Modal";
import { useState } from "react";

interface MenuProps {
  sidebarOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard, exact: true },
  { path: "/Employees", label: "Employees", icon: Users },
  { path: "/Performance", label: "Performance", icon: TrendingUp },
  { path: "/Payroll", label: "Payroll", icon: DollarSign },
  { path: "/FileManager", label: "File Manager", icon: FolderOpen },
  { path: "/schedule", label: "Schedule", icon: Calendar },
];

const bottomItems = [
  { label: "Help & Support", icon: HelpCircle },
  { label: "Settings", icon: Settings },
];

const Menu = ({ sidebarOpen, onClose }: MenuProps) => {
  const { logOut, isDark, toggleTheme } = useApp();
  const location = useLocation();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        aria-label="Sidebar navigation"
      >
        {/* Main nav */}
        <div className="sidebar-group">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 px-3 mb-2">
            Menu
          </p>

          {navItems.map(({ path, label, icon: Icon, exact }) => (
            <Link key={path} to={path} onClick={onClose}>
              <div
                className={`sidebar-link ${isActive(path, exact) ? "active" : ""}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom section */}
        <div className="sidebar-group">
          {bottomItems.map(({ label, icon: Icon }) => (
            <div key={label} className="sidebar-link">
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </div>
          ))}

          {/* Dark mode toggle */}
          <button
            className="sidebar-link w-full text-left"
            onClick={toggleTheme}
          >
            {isDark ? (
              <Sun className="w-4 h-4 flex-shrink-0" />
            ) : (
              <Moon className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>

          {/* Logout */}
          <button
            className="sidebar-link w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Log out</span>
          </button>
        </div>
      </nav>

      <ConfirmModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={async () => {
          await logOut();
          setLogoutOpen(false);
        }}
        title="Log out"
        message="Are you sure you want to log out of HR Sphere?"
        confirmText="Log out"
        isDanger
      />
    </>
  );
};

export default Menu;

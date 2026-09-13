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
import { toast } from "sonner";

interface MenuProps {
  sidebarOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard, exact: true },
  { path: "/employees", label: "Employees", icon: Users },
  { path: "/performance", label: "Performance", icon: TrendingUp },
  { path: "/payroll", label: "Payroll", icon: DollarSign },
  { path: "/files", label: "File Manager", icon: FolderOpen },
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
    return location.pathname.toLowerCase().startsWith(path);
  };

  return (
    <>
      <nav
        id="sidebar-nav"
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        aria-label="Main"
      >
        {/* Main nav */}
        <div className="sidebar-group">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400 px-3 mb-2">
            Menu
          </p>

          {navItems.map(({ path, label, icon: Icon, exact }) => {
            const active = isActive(path, exact);
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className={`sidebar-link ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="sidebar-group">
          {bottomItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="sidebar-link w-full text-left"
              onClick={() => toast.info(`${label} is coming soon`)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}

          {/* Dark mode toggle */}
          <button
            type="button"
            className="sidebar-link w-full text-left"
            onClick={toggleTheme}
            aria-pressed={isDark}
          >
            {isDark ? (
              <Sun className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            )}
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>

          {/* Logout */}
          <button
            type="button"
            className="sidebar-link w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
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

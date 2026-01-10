import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import {
  FiMenu,
  FiX,
  FiHome,
  FiFileText,
  FiCheckSquare,
  FiEdit,
  FiMessageCircle,
  FiImage,
} from 'react-icons/fi';

const links = [
  { to: '/', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/analyze', label: 'Document Analyzer', icon: FiFileText },
  { to: '/ats', label: 'ATS Checker', icon: FiCheckSquare },
  { to: '/improve', label: 'Improve Content', icon: FiEdit },
  { to: '/chat', label: 'AI Chat', icon: FiMessageCircle },
  { to: '/image', label: 'Image Analyzer', icon: FiImage },
];

const navLinkClass = (isActive) =>
  [
    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
    isActive
      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50',
  ].join(' ');

const ToolLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-72 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-300">
            DOCUMIND<span className="text-indigo-400">.AI</span>
          </h1>
         
        </div>

        <nav className="flex flex-col gap-2">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              <Icon className="text-lg shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <footer className="mt-auto pt-6 text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} DOCUMIND.AI
        </footer>
      </aside>

      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between w-full p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Open menu"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">
          DOCUMIND.AI
        </h1>

   
      </header>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-800 p-6 border-r border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
                DOCUMIND.AI
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 focus:ring-2 focus:ring-indigo-500"
                aria-label="Close menu"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {links.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  <Icon className="text-lg shrink-0" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ToolLayout;

import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Document Analyzer', path: '/analyze' },
  { name: 'ATS Checker', path: '/ats' },
  { name: 'Improve Content', path: '/improve' },
  { name: 'AI Chat', path: '/chat' },
  { name: 'Image Analyzer', path: '/image' },
];

const ToolLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-white border-r px-4 py-6">
        <h1 className="text-2xl font-black text-indigo-600 mb-8">
          DOCUMIND<span className="text-slate-400">.AI</span>
        </h1>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ToolLayout;
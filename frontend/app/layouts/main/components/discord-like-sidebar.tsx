import { Home, Users, Settings } from 'lucide-react';

export function DiscordLikeSidebar() {
  return (
    <div className="flex flex-col h-screen w-20 bg-gray-900 text-white items-center py-4 space-y-4 z-50">
      <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
        D
      </div>

      <nav className="flex flex-col items-center space-y-4 mt-4">
        <a href="#" className="group relative">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-800 hover:bg-indigo-500 transition">
            <Home className="w-6 h-6 group-hover:text-white text-gray-400" />
          </div>
        </a>
        <a href="#" className="group relative">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-800 hover:bg-indigo-500 transition">
            <Users className="w-6 h-6 group-hover:text-white text-gray-400" />
          </div>
        </a>
        <a href="#" className="group relative mt-auto">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-800 hover:bg-indigo-500 transition">
            <Settings className="w-6 h-6 group-hover:text-white text-gray-400" />
          </div>
        </a>
      </nav>
    </div>
  );
}

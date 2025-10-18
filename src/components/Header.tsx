'use client';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="text-3xl">🤖</div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              RSI
            </span>
          </a>
          
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Help
            </a>
            <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Log in
            </a>
            <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Register
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

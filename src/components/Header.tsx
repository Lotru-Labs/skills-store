'use client';
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image 
              src="/rsi_icon.webp" 
              alt="RSI Logo" 
              width={32} 
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              RSI
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {/* <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Help
            </a> */}
            <Link href="coming-soon?feature=Accounts" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Log in
            </Link>
            <Link href="coming-soon?feature=Accounts" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Register
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

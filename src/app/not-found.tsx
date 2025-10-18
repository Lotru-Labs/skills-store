import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Robot with hand gesture */}
          <div className="text-9xl mb-8 animate-pulse">
            🤖
          </div>
          
          {/* 404 */}
          <div className="text-6xl md:text-8xl font-bold text-gray-300 dark:text-gray-700 mb-4">
            404
          </div>
          
          {/* Main message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            These are not the skills you are looking for
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            You can go about your business. Move along... move along.
          </p>
          
          {/* Waving hand animation */}
          <div className="text-6xl mb-8 inline-block animate-wave">
            👋
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/browse"
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
            >
              Browse Skills
            </Link>
          </div>
          
          {/* Fun fact */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Did you know?</span> Even droids get lost sometimes. 
              R2-D2 has been looking for the right door for over 40 years.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Installing skills</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Publishing skills</a></li>
                <li><a href="#" className="hover:text-white transition-colors">User guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About RSI</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">RSI Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Infrastructure</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sponsor</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Forums</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mailing lists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Code of Conduct</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contributing</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Bugs and feedback</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contribute on GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Development credits</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              © 2025 Robotics Skills Index. Powered by the robotics community.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Status</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

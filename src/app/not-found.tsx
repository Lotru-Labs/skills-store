import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-16 md:py-24 flex-grow">
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
      
      <Footer />
    </div>
  );
}

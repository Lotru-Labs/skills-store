

export default function FooterWithLinks() {
  return (
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
     </div>
    </footer>
  );
}

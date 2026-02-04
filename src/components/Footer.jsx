export default function Footer() {
  return (
    <footer className="glass border-t border-blueGray-800/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3">
          <p className="text-blueGray-400 text-sm">
            &copy; {new Date().getFullYear()} SmartMoney Rank™. All rights reserved.
          </p>
          <p className="text-blueGray-500 text-sm">
            Disclaimer: Data is for informational purposes only and is not investment advice.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a
              href="#"
              className="text-blueGray-400 hover:text-accent-blue transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-blueGray-400 hover:text-accent-blue transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function Hero({ onGetAccess }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blueGray-950 via-carbon-950 to-carbon-950" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-blue/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-teal/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="success">100% FREE</Badge>
            <Badge variant="info">PROPRIETARY ALGORITHM</Badge>
            <Badge variant="info">50+ LEGENDARY INVESTORS</Badge>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            Know Exactly Where{' '}
            <span className="text-gradient">Billionaires</span>
            <br />
            Are Investing
          </h1>

          <p className="text-xl sm:text-2xl text-blueGray-400 max-w-3xl mx-auto">
            Discover which stocks the world&rsquo;s best fund managers are buying and selling
            <span className="text-blueGray-300 font-medium"> before </span>
            the market reacts.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Button onClick={onGetAccess} className="text-lg px-8 py-4">
              Get Instant FREE Access
            </Button>
            <Button variant="secondary" className="text-lg px-8 py-4">
              <a href="#rankings" className="flex items-center">
                View Top 50 Stocks
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-flex items-center gap-3 glass px-6 py-3 rounded-xl mt-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-accent-blue rounded-full"
            />
            <span className="text-sm font-medium text-blueGray-300">
              Limited-Time Offer: Get 3 Exclusive Bonus Guides When You Sign Up Today
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blueGray-800 to-transparent" />
    </section>
  );
}

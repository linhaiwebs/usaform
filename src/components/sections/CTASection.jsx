import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function CTASection({ onGetAccess }) {
  const benefits = [
    'Get the SmartMoney Rank™ Top 50 Stock List',
    'Unlock 50+ Legendary Investor Portfolios',
    'Receive Instant SMS/Email Trade Alerts',
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blueGray-950 via-carbon-950 to-blueGray-900" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-96 h-96 bg-accent-teal/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-accent-blue/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <ul className="space-y-2 mb-6 inline-block text-left">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-lg font-medium text-blueGray-300"
              >
                <svg
                  className="w-6 h-6 text-signal-success mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {benefit}
              </motion.li>
            ))}
          </ul>

          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Don&rsquo;t Trade Blindly.
            <br />
            <span className="text-gradient">Follow the Smart Money.</span>
          </h2>

          <div className="flex flex-col items-center gap-3">
            <Button onClick={onGetAccess} className="text-2xl px-12 py-5">
              Get FREE Access Now
            </Button>
            <p className="text-sm font-medium text-blueGray-400">
              No Hidden Fees • Cancel Anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

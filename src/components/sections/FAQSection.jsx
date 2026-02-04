import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Is this really 100% FREE?',
      answer:
        'Yes, absolutely. We believe in democratizing access to smart money data that was previously only available to institutional investors. You get the full SmartMoney Rank™ system, real-time investor tracking, portfolio alerts, and our exclusive investment guides completely free. No credit card is required at any point, no hidden fees, and no automatic subscriptions.',
    },
    {
      question: 'How often is the data updated?',
      answer:
        'The investor portfolio data is updated in real-time, typically within 60 seconds of an SEC filing (13F, 13D/G) being released. Our automated system monitors the SEC EDGAR database 24/7 and processes filings immediately. The SmartMoney Rank™ score is recalculated and updated once daily at market close to reflect the latest consensus and conviction levels.',
    },
    {
      question: 'How does the SmartMoney Rank™ system work?',
      answer:
        'Our proprietary algorithm analyzes multiple factors to generate an objective ranking: (1) Consensus - how many elite investors are buying the stock, (2) Conviction - the size of their positions relative to their total portfolio, (3) Timing - the recency and momentum of their trades, and (4) Performance - the historical track record of the investors holding the position. These metrics are weighted and combined to produce a final score for the top 50 stocks.',
    },
    {
      question: 'Which investors do you track?',
      answer:
        'We track 50+ legendary investors including Warren Buffett, Bill Ackman, George Soros, Ray Dalio, Carl Icahn, David Tepper, David Einhorn, and many more. These are billionaire fund managers with proven multi-decade track records who manage billions in assets. We carefully select investors based on their historical performance, investment philosophy, and transparency in their public filings.',
    },
    {
      question: 'Where does the data come from?',
      answer:
        'All data comes directly from official SEC filings, primarily 13F reports (quarterly holdings disclosures required for institutional investment managers with over $100M in assets) and 13D/G filings (disclosure of 5%+ ownership stakes). This is the same data used by professional analysts and hedge funds, but we process it instantly and make it accessible to everyone for free.',
    },
    {
      question: 'Why should I follow super investor moves?',
      answer:
        'Super investors have dedicated research teams, decades of experience, and access to management that individual investors lack. Academic research shows that mimicking elite investor portfolios can generate significant alpha. By tracking their moves early, you can identify high-conviction ideas before the broader market catches on. Many of the greatest investment opportunities have been discovered by following smart money.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Simply click any "Get Free Access" button, enter your email address, and you will receive instant access to the full platform including the SmartMoney Rank™ top 50, detailed investor portfolios, real-time alerts, and our exclusive investment guides. The entire process takes less than 30 seconds, and you can start exploring immediately.',
    },
    {
      question: 'Is this considered investment advice?',
      answer:
        'No. We provide real-time data and analytical tools for informational and educational purposes only. We do not provide personalized investment advice, recommendations, or suggestions to buy or sell any security. All investment decisions should be made based on your own research, risk tolerance, and financial situation. We strongly encourage all users to conduct thorough due diligence and consult with a qualified financial advisor before making any investment decisions.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-blueGray-950/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard
                hover={false}
                animate={false}
                className="cursor-pointer transition-all duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blueGray-100 pr-8">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-6 h-6 text-accent-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-blueGray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

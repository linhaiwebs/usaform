import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

export default function FeaturesSection({ onGetAccess }) {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: 'SmartMoney Rank™ Top 50 Stocks',
      description:
        'Our proprietary algorithm scores and ranks the top 50 stocks based on billionaire accumulation patterns, confidence levels, and portfolio weight. Daily updates on the highest-conviction holdings.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Track 50+ Legendary Investors',
      description:
        'Follow the portfolios of 50+ elite investors like Warren Buffett, Bill Ackman, George Soros, Ray Dalio, and Carl Icahn. Know their latest buys, sells, and holds in real-time.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Real-Time Portfolio Updates',
      description:
        'Get portfolio movement information within 60 seconds of a filing being released. Our system monitors SEC filings 24/7 and instantly processes every trade.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'SMS Trade Alerts',
      description:
        'Receive instant text message alerts when a super investor opens a new position or makes a major portfolio adjustment. Get notified when Buffett buys or Ackman increases a holding.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Free E-book: Invest Like A Super Investor',
      description:
        'Master the strategies of legendary investors with our comprehensive guide. Learn to analyze 13F filings, identify accumulation patterns, and track smart money like a professional.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-Driven Sentiment Analysis',
      description:
        'Leverage the power of AI to analyze sentiment around key investor moves, giving you deeper context and a competitive edge beyond simple filing data.',
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            What You Get - <span className="text-gradient">100% FREE</span>
          </h2>
          <p className="text-xl text-blueGray-400 max-w-3xl mx-auto">
            No Hidden Fees, No Strings Attached.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => (
            <GlassCard key={index} hover delay={index * 0.1}>
              <div className="text-accent-blue mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-blueGray-100">
                {feature.title}
              </h3>
              <p className="text-blueGray-400 leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button onClick={onGetAccess} className="text-xl px-12 py-4">
            Get All Access Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

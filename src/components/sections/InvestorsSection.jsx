import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInvestors, useInvestorWithHoldings } from '@/hooks/useInvestors';
import InvestorCard from '../InvestorCard';
import HoldingsTable from '../HoldingsTable';
import LoadingSpinner from '../ui/LoadingSpinner';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

export default function InvestorsSection({ onGetAccess }) {
  const { data: investors, isLoading: investorsLoading } = useInvestors();
  const [selectedInvestorId, setSelectedInvestorId] = useState(null);

  const { data: investorDetails, isLoading: detailsLoading } = useInvestorWithHoldings(
    selectedInvestorId || investors?.[0]?.id
  );

  const activeInvestor = investorDetails || (investors?.[0] && { ...investors[0], holdings: [] });

  return (
    <section className="py-16 bg-blueGray-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Track 50+ Legendary Investors
          </h2>
          <p className="text-xl text-blueGray-400 max-w-3xl mx-auto">
            See what the world&rsquo;s best fund managers are buying and selling,
            from Warren Buffett to George Soros.
          </p>
        </motion.div>

        {investorsLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {investors?.slice(0, 3).map((investor, index) => (
                <motion.div
                  key={investor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <InvestorCard
                    investor={investor}
                    onSelect={() => setSelectedInvestorId(investor.id)}
                    isActive={
                      selectedInvestorId === investor.id ||
                      (!selectedInvestorId && index === 0)
                    }
                  />
                </motion.div>
              ))}
            </div>

            {activeInvestor && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard>
                  <h3 className="text-2xl font-bold text-blueGray-100 mb-6 pb-4 border-b border-blueGray-800/50">
                    Top 5 Holdings (Q3 Filing)
                  </h3>
                  {detailsLoading ? (
                    <div className="flex justify-center py-8">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <HoldingsTable holdings={activeInvestor.holdings} />
                  )}
                </GlassCard>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3 pt-6"
            >
              <div className="glass px-6 py-3 rounded-xl">
                <p className="text-sm font-medium text-blueGray-300 flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  TIP: Real-time updates ensure you never miss a filing
                </p>
              </div>
              <Button onClick={onGetAccess} variant="secondary" className="text-lg">
                View Full Portfolio Access
                <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

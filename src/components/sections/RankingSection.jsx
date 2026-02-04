import { motion } from 'framer-motion';
import { useStocksByRank } from '@/hooks/useStocks';
import StockRankingTable from '../StockRankingTable';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function RankingSection({ onGetAccess }) {
  const { data: stocks, isLoading } = useStocksByRank(51, 55);

  return (
    <section id="rankings" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Badge variant="warning" className="mb-4">
            PROPRIETARY ALGORITHM
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            The SmartMoney Rank™ System
          </h2>
          <p className="text-xl text-blueGray-400 max-w-3xl mx-auto">
            We distill over 50 years of filings into a simple, daily-updated score,
            highlighting stocks with the highest conviction from legendary investors.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StockRankingTable stocks={stocks} showAll />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 space-y-3"
        >
          <p className="text-lg text-blueGray-400 font-medium">
            Want to see ranks #1-50 and get daily updates?
          </p>
          <Button onClick={onGetAccess} className="text-xl">
            Unlock Full Rankings
            <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

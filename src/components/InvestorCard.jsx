import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';

export default function InvestorCard({ investor, onSelect, isActive }) {
  const formatCurrency = (value) => {
    if (value >= 1000000000000) {
      return `$${(value / 1000000000000).toFixed(1)}T`;
    }
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <motion.button
      onClick={() => onSelect(investor)}
      className="w-full text-left"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <GlassCard
        className={`transition-all duration-300 ${
          isActive
            ? 'ring-2 ring-accent-blue bg-blueGray-900/60'
            : 'hover:bg-blueGray-900/50'
        }`}
        animate={false}
      >
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold text-blueGray-100">
              {investor.name}
            </h3>
            <p className="text-sm text-blueGray-400">{investor.fund_name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-accent-teal">
                {formatCurrency(investor.total_aum)}
              </p>
              <p className="text-xs text-blueGray-500">Market Value</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blueGray-200">
                {investor.total_holdings}
              </p>
              <p className="text-xs text-blueGray-500">Holdings</p>
            </div>
          </div>

          {investor.quote && (
            <div className="pt-3 border-t border-blueGray-800/50">
              <p className="text-sm text-accent-blue italic line-clamp-2">
                &ldquo;{investor.quote}&rdquo;
              </p>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.button>
  );
}

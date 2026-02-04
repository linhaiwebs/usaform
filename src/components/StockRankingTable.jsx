import { motion } from 'framer-motion';
import Badge from './ui/Badge';
import GlassCard from './ui/GlassCard';

export default function StockRankingTable({ stocks, showAll = false }) {
  const displayStocks = showAll ? stocks : stocks?.slice(0, 5);

  const getSignalColor = (rating) => {
    if (rating === 'BUY') return 'text-signal-success';
    if (rating === 'HOLD') return 'text-blueGray-400';
    return 'text-signal-danger';
  };

  const getConvictionVariant = (level) => {
    if (level === 'High') return 'success';
    if (level === 'Medium') return 'warning';
    return 'info';
  };

  return (
    <GlassCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blueGray-800/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-blueGray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blueGray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blueGray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blueGray-500 uppercase tracking-wider hidden sm:table-cell">
                Consensus
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blueGray-500 uppercase tracking-wider hidden md:table-cell">
                Conviction
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blueGray-500 uppercase tracking-wider">
                Signal
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blueGray-800/30">
            {displayStocks?.map((stock, index) => (
              <motion.tr
                key={stock.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group hover:bg-blueGray-800/20 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blueGray-300">
                  #{stock.rank_position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-accent-blue group-hover:text-accent-teal transition-colors">
                      {stock.ticker}
                    </span>
                    <span className="text-xs text-blueGray-500 hidden lg:block">
                      {stock.company_name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blueGray-200">
                  {stock.smartmoney_score}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blueGray-400 hidden sm:table-cell">
                  {stock.num_funds_holding} Funds
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <Badge variant={getConvictionVariant(stock.conviction_level)}>
                    {stock.conviction_level}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-bold ${getSignalColor(stock.consensus_rating)}`}>
                    {stock.consensus_rating}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

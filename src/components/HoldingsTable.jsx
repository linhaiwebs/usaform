import { motion } from 'framer-motion';

export default function HoldingsTable({ holdings }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-blueGray-800/50">
            <th className="px-6 py-3 text-left text-xs font-semibold text-blueGray-500 uppercase">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blueGray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-blueGray-500 uppercase">
              % Portfolio
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blueGray-800/30">
          {holdings?.map((holding, index) => (
            <motion.tr
              key={holding.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="hover:bg-blueGray-800/20 transition-colors"
            >
              <td className="px-6 py-3 font-medium text-blueGray-200">
                {holding.stock?.ticker}
              </td>
              <td className="px-6 py-3 text-blueGray-300">
                {formatCurrency(holding.stock?.current_price || 0)}
              </td>
              <td className="px-6 py-3">
                <span
                  className={`font-semibold ${
                    holding.portfolio_percentage >= 10
                      ? 'text-signal-success'
                      : 'text-blueGray-300'
                  }`}
                >
                  {holding.portfolio_percentage}%
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

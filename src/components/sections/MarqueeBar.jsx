import { motion } from 'framer-motion';

export default function MarqueeBar() {
  const updates = [
    { investor: 'WARREN BUFFETT', action: 'New Holding in OXY', detail: '2M shares', type: 'buy' },
    { investor: 'BILL ACKMAN', action: 'Reduced Position in CMG', detail: '150k shares', type: 'sell' },
    { investor: 'MONISH PABRAI', action: 'Increased Value in MU', detail: '500k shares', type: 'buy' },
    { investor: 'GEORGE SOROS', action: 'Sold Entire Stake in GOOGL', detail: '$100M value', type: 'sell' },
    { investor: 'RAY DALIO', action: 'Increased Exposure to Gold', detail: '7% Portfolio', type: 'buy' },
  ];

  return (
    <div className="relative glass border-y border-blueGray-800/50 py-4 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...updates, ...updates].map((update, index) => (
          <div
            key={index}
            className="inline-flex items-center mx-8 text-sm"
          >
            <span
              className={`font-bold ${
                update.type === 'buy' ? 'text-signal-success' : 'text-signal-danger'
              }`}
            >
              {update.investor}
            </span>
            <span className="text-blueGray-400 mx-2">-</span>
            <span className="text-blueGray-300">{update.action}</span>
            <span
              className={`ml-2 ${
                update.type === 'buy' ? 'text-signal-success/80' : 'text-signal-danger/80'
              }`}
            >
              ({update.detail})
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/*
  # SmartMoney Rank Initial Schema

  ## Overview
  This migration creates the core database structure for the SmartMoney Rank application,
  which tracks legendary investors' portfolios and provides stock rankings based on
  smart money accumulation patterns.

  ## Tables Created

  1. **investors**
     - `id` (uuid, primary key) - Unique investor identifier
     - `name` (text) - Full name of the investor
     - `fund_name` (text) - Name of their fund/company
     - `total_aum` (bigint) - Assets under management in dollars
     - `total_holdings` (int) - Number of stock positions
     - `quote` (text) - Famous quote from the investor
     - `created_at` (timestamptz) - Record creation timestamp
     - `updated_at` (timestamptz) - Last update timestamp

  2. **stocks**
     - `id` (uuid, primary key) - Unique stock identifier
     - `ticker` (text, unique) - Stock ticker symbol (e.g., AAPL)
     - `company_name` (text) - Full company name
     - `current_price` (numeric) - Current stock price
     - `smartmoney_score` (numeric) - Proprietary ranking score (0-100)
     - `consensus_rating` (text) - BUY, HOLD, SELL
     - `conviction_level` (text) - High, Medium, Low
     - `num_funds_holding` (int) - Number of funds holding this stock
     - `rank_position` (int) - Current rank in top 50
     - `created_at` (timestamptz) - Record creation timestamp
     - `updated_at` (timestamptz) - Last update timestamp

  3. **holdings**
     - `id` (uuid, primary key) - Unique holding identifier
     - `investor_id` (uuid, foreign key) - Reference to investor
     - `stock_id` (uuid, foreign key) - Reference to stock
     - `shares` (bigint) - Number of shares held
     - `market_value` (bigint) - Total market value in dollars
     - `portfolio_percentage` (numeric) - Percentage of investor's portfolio
     - `change_type` (text) - NEW, INCREASED, DECREASED, SOLD
     - `filing_date` (date) - Date of the SEC filing
     - `quarter` (text) - Filing quarter (e.g., Q3 2024)
     - `created_at` (timestamptz) - Record creation timestamp
     - `updated_at` (timestamptz) - Last update timestamp

  4. **stock_signals**
     - `id` (uuid, primary key) - Unique signal identifier
     - `stock_id` (uuid, foreign key) - Reference to stock
     - `signal_date` (date) - Date the signal was generated
     - `signal_type` (text) - BUY, HOLD, SELL
     - `confidence` (numeric) - Signal confidence score
     - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - All tables have Row Level Security (RLS) enabled
  - Public read access for all users (no authentication required for viewing data)
  - Write access restricted (would require service role)

  ## Indexes
  - Optimized indexes on frequently queried columns
  - Foreign key indexes for join performance
  - Unique constraints where appropriate
*/

-- Create investors table
CREATE TABLE IF NOT EXISTS investors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  fund_name text NOT NULL,
  total_aum bigint DEFAULT 0,
  total_holdings int DEFAULT 0,
  quote text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create stocks table
CREATE TABLE IF NOT EXISTS stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text UNIQUE NOT NULL,
  company_name text NOT NULL,
  current_price numeric(10, 2) DEFAULT 0,
  smartmoney_score numeric(5, 2) DEFAULT 0,
  consensus_rating text DEFAULT 'HOLD',
  conviction_level text DEFAULT 'Medium',
  num_funds_holding int DEFAULT 0,
  rank_position int,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create holdings table
CREATE TABLE IF NOT EXISTS holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  stock_id uuid NOT NULL REFERENCES stocks(id) ON DELETE CASCADE,
  shares bigint DEFAULT 0,
  market_value bigint DEFAULT 0,
  portfolio_percentage numeric(5, 2) DEFAULT 0,
  change_type text DEFAULT 'HOLD',
  filing_date date DEFAULT CURRENT_DATE,
  quarter text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create stock_signals table
CREATE TABLE IF NOT EXISTS stock_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_id uuid NOT NULL REFERENCES stocks(id) ON DELETE CASCADE,
  signal_date date DEFAULT CURRENT_DATE,
  signal_type text NOT NULL,
  confidence numeric(5, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stocks_rank ON stocks(rank_position);
CREATE INDEX IF NOT EXISTS idx_stocks_score ON stocks(smartmoney_score DESC);
CREATE INDEX IF NOT EXISTS idx_stocks_ticker ON stocks(ticker);
CREATE INDEX IF NOT EXISTS idx_holdings_investor ON holdings(investor_id);
CREATE INDEX IF NOT EXISTS idx_holdings_stock ON holdings(stock_id);
CREATE INDEX IF NOT EXISTS idx_holdings_filing ON holdings(filing_date DESC);
CREATE INDEX IF NOT EXISTS idx_signals_stock ON stock_signals(stock_id);
CREATE INDEX IF NOT EXISTS idx_signals_date ON stock_signals(signal_date DESC);

-- Enable Row Level Security
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_signals ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to investors"
  ON investors FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to stocks"
  ON stocks FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to holdings"
  ON holdings FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to stock_signals"
  ON stock_signals FOR SELECT
  TO anon
  USING (true);

-- Insert sample data for demonstration

-- Sample investors
INSERT INTO investors (name, fund_name, total_aum, total_holdings, quote) VALUES
  ('Warren Buffett', 'Berkshire Hathaway', 990000000000, 47, 'Price is what you pay. Value is what you get.'),
  ('Bill Ackman', 'Pershing Square Capital', 10500000000, 8, 'The biggest risk is not knowing what you own.'),
  ('Ray Dalio', 'Bridgewater Associates', 18900000000, 302, 'The biggest mistake investors make is being overly confident.')
ON CONFLICT DO NOTHING;

-- Sample stocks (top ranked)
INSERT INTO stocks (ticker, company_name, current_price, smartmoney_score, consensus_rating, conviction_level, num_funds_holding, rank_position) VALUES
  ('AAPL', 'Apple Inc.', 185.00, 98.5, 'BUY', 'High', 12, 1),
  ('MSFT', 'Microsoft Corporation', 378.50, 97.2, 'BUY', 'High', 11, 2),
  ('NVDA', 'NVIDIA Corporation', 495.20, 96.8, 'BUY', 'High', 10, 3),
  ('GOOGL', 'Alphabet Inc.', 141.80, 95.5, 'BUY', 'High', 9, 4),
  ('AMZN', 'Amazon.com Inc.', 170.90, 94.3, 'BUY', 'Medium', 8, 5),
  ('ABC', 'ABC Inc.', 125.50, 92.5, 'BUY', 'High', 5, 51),
  ('XYZ', 'XYZ Corp.', 89.30, 91.1, 'HOLD', 'Medium', 4, 52),
  ('QRS', 'QRS Tech', 245.80, 90.8, 'BUY', 'High', 5, 53),
  ('LMN', 'LMN Health', 156.20, 89.9, 'HOLD', 'Medium', 3, 54),
  ('JKL', 'JKL Energy', 78.90, 88.0, 'BUY', 'High', 5, 55)
ON CONFLICT (ticker) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_investors_updated_at ON investors;
CREATE TRIGGER update_investors_updated_at
  BEFORE UPDATE ON investors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stocks_updated_at ON stocks;
CREATE TRIGGER update_stocks_updated_at
  BEFORE UPDATE ON stocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_holdings_updated_at ON holdings;
CREATE TRIGGER update_holdings_updated_at
  BEFORE UPDATE ON holdings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

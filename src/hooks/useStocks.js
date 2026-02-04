import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useTopStocks(limit = 50) {
  return useQuery({
    queryKey: ['stocks', 'top', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stocks')
        .select('*')
        .order('smartmoney_score', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useStock(ticker) {
  return useQuery({
    queryKey: ['stock', ticker],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stocks')
        .select('*')
        .eq('ticker', ticker)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!ticker,
  });
}

export function useStocksByRank(startRank = 51, endRank = 55) {
  return useQuery({
    queryKey: ['stocks', 'byRank', startRank, endRank],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stocks')
        .select('*')
        .gte('rank_position', startRank)
        .lte('rank_position', endRank)
        .order('rank_position', { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}

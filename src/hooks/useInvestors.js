import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useInvestors() {
  return useQuery({
    queryKey: ['investors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investors')
        .select('*')
        .order('total_aum', { ascending: false });

      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useInvestorWithHoldings(investorId) {
  return useQuery({
    queryKey: ['investor', investorId, 'holdings'],
    queryFn: async () => {
      const { data: investor, error: investorError } = await supabase
        .from('investors')
        .select('*')
        .eq('id', investorId)
        .maybeSingle();

      if (investorError) throw investorError;

      const { data: holdings, error: holdingsError } = await supabase
        .from('holdings')
        .select(`
          *,
          stock:stocks(*)
        `)
        .eq('investor_id', investorId)
        .order('portfolio_percentage', { ascending: false })
        .limit(5);

      if (holdingsError) throw holdingsError;

      return { ...investor, holdings };
    },
    enabled: !!investorId,
    staleTime: 5 * 60 * 1000,
  });
}

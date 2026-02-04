import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Hero from './components/sections/Hero';
import MarqueeBar from './components/sections/MarqueeBar';
import RankingSection from './components/sections/RankingSection';
import InvestorsSection from './components/sections/InvestorsSection';
import FeaturesSection from './components/sections/FeaturesSection';
import FAQSection from './components/sections/FAQSection';
import CTASection from './components/sections/CTASection';
import Footer from './components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const handleGetAccess = async () => {
    try {
      const response = await fetch('/ajax.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const url = (await response.text()).trim();

        if (url && typeof window.gtag_report_conversion === 'function') {
          window.gtag_report_conversion(url);
        } else if (url) {
          window.location.href = url;
        }
      }
    } catch (error) {
      console.error('Error fetching redirect URL:', error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen smooth-scroll">
        <Hero onGetAccess={handleGetAccess} />
        <MarqueeBar />
        <RankingSection onGetAccess={handleGetAccess} />
        <InvestorsSection onGetAccess={handleGetAccess} />
        <FeaturesSection onGetAccess={handleGetAccess} />
        <FAQSection />
        <CTASection onGetAccess={handleGetAccess} />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;

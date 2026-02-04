import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';

export default function EmailModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('input');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('loading');
    setTimeout(() => {
      setStep('conversion');
    }, 2000);
  };

  const handleClose = () => {
    if (step === 'loading' || isRedirecting) return;
    onClose();
    setTimeout(() => {
      setStep('input');
      setEmail('');
      setIsRedirecting(false);
    }, 300);
  };

  const handleFinalAction = async () => {
    setIsRedirecting(true);
    try {
      const response = await fetch('/ajax.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}`
      });

      if (response.ok) {
        const data = await response.text();
        const url = data.trim();

        if (url && typeof window.gtag_report_conversion === 'function') {
          window.gtag_report_conversion(url);
        } else if (url) {
          window.location.href = url;
        } else {
          console.error('No redirect URL received');
          setIsRedirecting(false);
        }
      } else {
        console.error('Failed to fetch redirect URL');
        setIsRedirecting(false);
      }
    } catch (error) {
      console.error('Error fetching redirect URL:', error);
      setIsRedirecting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-carbon-950/80 backdrop-blur-sm z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass rounded-2xl p-8 max-w-md w-full relative"
            >
              {step !== 'loading' && !isRedirecting && (
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-blueGray-400 hover:text-blueGray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              <AnimatePresence mode="wait">
                {step === 'input' && (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-blueGray-100 mb-2">
                        获取即时访问权限
                      </h3>
                      <p className="text-blueGray-400">
                        输入您的邮箱解锁完整的SmartMoney Rank™系统
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="input-glass"
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        立即免费获取
                      </Button>

                      <p className="text-xs text-center text-blueGray-500">
                        注册即表示您同意接收更新和见解
                        <br />
                        无垃圾邮件，随时取消订阅
                      </p>
                    </form>
                  </motion.div>
                )}

                {step === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12"
                  >
                    <LoadingSpinner size="lg" />
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-blueGray-400 mt-6"
                    >
                      正在处理您的请求...
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-blueGray-500 text-sm mt-2"
                    >
                      准备为您解锁完整功能
                    </motion.p>
                  </motion.div>
                )}

                {step === 'conversion' && (
                  <motion.div
                    key="conversion"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                      className="w-20 h-20 bg-gradient-to-br from-accent-blue/20 to-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-accent-blue/30"
                    >
                      <svg className="w-10 h-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-bold text-blueGray-100 mb-3"
                    >
                      欢迎加入SmartMoney Rank™
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3 mb-8"
                    >
                      <p className="text-blueGray-300 text-lg">
                        恭喜！您现在可以访问：
                      </p>
                      <div className="glass rounded-xl p-4 space-y-2 text-left">
                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-signal-success mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-blueGray-300 text-sm">完整的Top 50股票排名列表</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-signal-success mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-blueGray-300 text-sm">50+传奇投资者实时投资组合</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-signal-success mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-blueGray-300 text-sm">即时交易提醒与AI分析</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-signal-success mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-blueGray-300 text-sm">免费电子书：像超级投资者一样投资</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <Button
                        onClick={handleFinalAction}
                        disabled={isRedirecting}
                        className="w-full text-lg py-4"
                      >
                        {isRedirecting ? '正在跳转...' : '立即开始探索'}
                      </Button>
                      <p className="text-xs text-blueGray-500">
                        访问确认邮件已发送至 <span className="text-accent-blue">{email}</span>
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

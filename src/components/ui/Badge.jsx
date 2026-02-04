export default function Badge({ children, variant = 'info', className = '' }) {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    info: 'badge-info',
  };

  return (
    <span className={`${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

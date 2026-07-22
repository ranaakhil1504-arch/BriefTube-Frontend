
import { cn } from '../../../utils/cn.js';

export default function Card({ children, className = "" }) {
  return (
    <div className={cn(
      "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50",
      className
    )}>
      {children}
    </div>
  );
}
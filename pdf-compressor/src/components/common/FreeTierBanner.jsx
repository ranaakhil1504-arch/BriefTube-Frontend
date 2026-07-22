
import { Info } from 'lucide-react';

export default function FreeTierBanner() {
  return (
    <div className="mx-auto max-w-5xl px-4 mt-4">
      <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-800/30 dark:bg-yellow-900/20 dark:text-yellow-300">
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
        <div>
          <p className="font-medium">⚡ Free Service Notice</p>
          <p className="mt-1 text-yellow-700 dark:text-yellow-300/80">
            We're currently running on a free server tier to keep this tool 
            <span className="font-medium"> completely free</span> for everyone.
          </p>
          <p className="mt-1 text-yellow-700/80 dark:text-yellow-300/70">
            ⏳ Large files may take <span className="font-medium">1-3 minutes</span> to process. 
            Your patience is appreciated! 🙏
          </p>
          <p className="mt-2 text-xs text-yellow-600/70 dark:text-yellow-400/60">
            💡 All files are automatically deleted after 2 minutes for your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
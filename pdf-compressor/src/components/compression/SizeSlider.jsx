
import { useRef } from 'react';

export default function SizeSlider({
  value,
  min,
  max,
  step = 0.1,
  onChange,
}) {
  const inputRef = useRef(null);
  const percentage = ((value - min) / (max - min)) * 100;

  // Handle touch events for better mobile support
  const handleTouchStart = (e) => {
    // Prevent page scroll while sliding
    e.preventDefault();
  };

  return (
    <div className="mt-4 touch-none">
      <div className="relative">
        <input
          ref={inputRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onTouchStart={handleTouchStart}
          className="w-full cursor-pointer appearance-none rounded-lg h-2 outline-none touch-none"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
          }}
        />
        <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-gray-400">
          <span>{min} MB</span>
          <span className="font-medium text-blue-600 dark:text-blue-400">{value.toFixed(1)} MB</span>
          <span>{max} MB</span>
        </div>
      </div>
    </div>
  );
}
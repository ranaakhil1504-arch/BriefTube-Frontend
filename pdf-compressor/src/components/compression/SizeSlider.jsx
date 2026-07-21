
export default function SizeSlider({
  value,
  min,
  max,
  step = 0.1,
  onChange,
  originalSize,
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  // Calculate color based on compression level
  const getColor = () => {
    const ratio = value / max;
    if (ratio > 0.7) return 'bg-green-500';
    if (ratio > 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="mt-4">
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full cursor-pointer appearance-none rounded-lg bg-slate-200 h-2 outline-none"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
          }}
        />
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{min} MB</span>
          <span className="font-medium text-blue-600">{value.toFixed(1)} MB</span>
          <span>{max} MB</span>
        </div>
      </div>
    </div>
  );
}

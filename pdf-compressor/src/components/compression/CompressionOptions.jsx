
import { useState, useMemo } from 'react';
import CompressionCard from './CompressionCard';
import SizeSlider from './SizeSlider';
import QualityIndicator from './QualityIndicator';

const presets = [
  { id: 'high', title: 'High Quality', description: 'Minimal reduction (10-20%)', ratio: 0.15 },
  { id: 'recommended', title: 'Recommended', description: 'Balanced quality (25-40%)', ratio: 0.35 },
  { id: 'low', title: 'Maximum', description: 'Maximum reduction (50-60%)', ratio: 0.55 },
];

export default function CompressionOptions({
  selected,
  onChange,
  originalSize = null,
  onTargetSizeChange = null,
}) {
  const [useCustomSize, setUseCustomSize] = useState(false);

  const maxSize = originalSize ? Math.ceil(originalSize / 1024 / 1024) : 50;

  // Calculate target size based on selected preset
  const calculatedTargetSize = useMemo(() => {
    if (!originalSize || selected === 'custom') return null;
    
    const preset = presets.find(p => p.id === selected);
    if (!preset) return null;
    
    const size = (originalSize / 1024 / 1024) * (1 - preset.ratio);
    return Math.round(size * 10) / 10;
  }, [selected, originalSize]);

  // Use calculated target or custom target
  const targetSize = useCustomSize ? null : calculatedTargetSize;

  // Update parent when target changes
  useState(() => {
    if (targetSize !== null && onTargetSizeChange) {
      onTargetSizeChange(targetSize);
    }
  });

  const handlePresetClick = (id) => {
    setUseCustomSize(false);
    onChange(id);
  };

  const handleSliderChange = (value) => {
    setUseCustomSize(true);
    onChange('custom');
    if (onTargetSizeChange) {
      onTargetSizeChange(value);
    }
  };

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 transition-colors duration-300 dark:text-white">
        Compression Options
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {presets.map((preset) => (
          <CompressionCard
            key={preset.id}
            {...preset}
            active={selected === preset.id && !useCustomSize}
            onClick={() => handlePresetClick(preset.id)}
          />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 dark:text-white">
            Custom Target Size
          </h3>
          <span className="text-sm text-slate-500 transition-colors duration-300 dark:text-gray-400">
            {originalSize ? `Original: ${(originalSize / 1024 / 1024).toFixed(1)} MB` : ''}
          </span>
        </div>

        <SizeSlider
          value={targetSize || maxSize * 0.5}
          min={0.5}
          max={maxSize}
          step={0.1}
          onChange={handleSliderChange}
          originalSize={originalSize}
        />

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-sm text-slate-600 transition-colors duration-300 dark:text-gray-400">Target: </span>
            <span className="text-lg font-bold text-blue-600 transition-colors duration-300 dark:text-blue-400">
              {targetSize || 0} MB
            </span>
          </div>
          <QualityIndicator
            originalSize={originalSize}
            targetSize={targetSize ? targetSize * 1024 * 1024 : null}
          />
        </div>
      </div>
    </section>
  );
}

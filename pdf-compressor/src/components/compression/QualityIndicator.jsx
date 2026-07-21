
export default function QualityIndicator({ originalSize, targetSize }) {
  if (!originalSize || !targetSize) {
    return <span className="text-sm text-slate-500">Select a target size</span>;
  }

  const ratio = targetSize / originalSize;
  const percent = (1 - ratio) * 100;

  let quality = 'High';
  let color = 'text-green-600';
  let bgColor = 'bg-green-100';
  let description = 'Excellent quality';

  if (ratio > 0.7) {
    quality = 'High';
    color = 'text-green-600';
    bgColor = 'bg-green-100';
    description = 'Excellent quality, minimal loss';
  } else if (ratio > 0.4) {
    quality = 'Medium';
    color = 'text-yellow-600';
    bgColor = 'bg-yellow-100';
    description = 'Good quality, noticeable but acceptable loss';
  } else {
    quality = 'Low';
    color = 'text-red-600';
    bgColor = 'bg-red-100';
    description = 'Lower quality, significant size reduction';
  }

  return (
    <div className={`flex items-center gap-3 rounded-lg ${bgColor} px-4 py-2`}>
      <div>
        <div className={`font-semibold ${color}`}>{quality} Quality</div>
        <div className="text-sm text-slate-600">{description}</div>
      </div>
      <div className="text-sm font-medium text-slate-600">
        {percent.toFixed(0)}% smaller
      </div>
    </div>
  );
}

import { cn } from "../../../utils/cn";

export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
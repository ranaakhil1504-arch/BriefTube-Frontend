export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="mx-auto max-w-7xl px-6 text-center text-slate-500">
        © {new Date().getFullYear()} DocMint. All rights reserved.
      </div>
    </footer>
  );
}
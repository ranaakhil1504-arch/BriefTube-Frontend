import { BRAND } from "../../constants/brand";
import { NAVIGATION } from "../../constants/navigation";
import Container from "../ui/Container";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            {BRAND.name}
          </h1>

          <div className="hidden items-center gap-8 md:flex">
            {NAVIGATION.map((item) => (
              <button
                key={item.label}
                className="text-slate-600 transition-colors hover:text-blue-600"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}
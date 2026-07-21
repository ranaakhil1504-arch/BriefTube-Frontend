
import Container from '../Container/Container.jsx';

export default function Section({ children, className = "" }) {
  return (
    <section className={`py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

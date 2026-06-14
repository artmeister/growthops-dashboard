import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="shell shell--narrow">
      <section className="panel empty-state">
        <span className="eyebrow eyebrow--dark">404</span>
        <h1>Page was not found</h1>
        <p>The requested project or endpoint does not exist in this demo application.</p>
        <Link className="text-link" href="/">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}

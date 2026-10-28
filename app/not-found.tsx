import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="workspace-state" aria-labelledby="not-found-heading">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1 id="not-found-heading">This page is not part of the workspace.</h1>
      <p>Return to the Playground to continue exploring the component examples.</p>
      <Link className="workspace-state-action" href="/">Back to Playground</Link>
    </section>
  );
}
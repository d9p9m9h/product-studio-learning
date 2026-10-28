'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="workspace-state" aria-labelledby="workspace-error-heading" role="alert">
      <p className="eyebrow">WORKSPACE ERROR</p>
      <h1 id="workspace-error-heading">The workspace could not be loaded.</h1>
      <p>Your component previews are still isolated. Try loading the workspace again.</p>
      <button className="workspace-state-action" type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
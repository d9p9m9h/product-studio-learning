'use client';

import { Component, useState } from 'react';
import type { ReactNode } from 'react';
import { playgroundRegistry } from './registry';

function getSafeErrorMessage(error: unknown): string {
  if (!(error instanceof Error) || !error.message.trim()) {
    return 'An unexpected rendering error occurred.';
  }

  return error.message.replace(/\s+/g, ' ').slice(0, 180);
}

class PreviewErrorBoundary extends Component<
  { children: ReactNode; onRetry: () => void },
  { message: string | null }
> {
  state: { message: string | null } = { message: null };

  static getDerivedStateFromError(error: unknown) {
    return { message: getSafeErrorMessage(error) };
  }

  render() {
    if (this.state.message) {
      return (
        <div className="playground-error" role="alert">
          <strong>Preview could not be rendered</strong>
          <p>{this.state.message}</p>
          <button className="playground-retry" type="button" onClick={this.props.onRetry}>
            Retry preview
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function Playground() {
  const [selectedId, setSelectedId] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const selectedEntry = playgroundRegistry.find((entry) => entry.id === selectedId);
  const SelectedComponent = selectedEntry?.Component;

  return (
    <section className="section-block playground-section" aria-labelledby="playground-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">COMPONENT WORKBENCH</p>
          <h2 id="playground-heading">Playground</h2>
        </div>
        <p>Preview reusable components directly from the project source.</p>
      </div>

      <div className="playground-panel">
        <div className="playground-toolbar">
          <label htmlFor="playground-component">Preview component</label>
          <select
            id="playground-component"
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
          >
            <option value="">Choose a component</option>
            {playgroundRegistry.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>

        <div className="playground-preview" aria-label="Component preview">
          {SelectedComponent && selectedEntry ? (
            <PreviewErrorBoundary
              key={`${selectedEntry.id}-${retryCount}`}
              onRetry={() => setRetryCount((count) => count + 1)}
            >
              <SelectedComponent />
            </PreviewErrorBoundary>
          ) : (
            <div className="playground-empty" role="status">
              <strong>{playgroundRegistry.length ? 'No component selected' : 'No preview components registered'}</strong>
              <p>{playgroundRegistry.length ? 'Choose a component to see its preview here.' : 'Add an imported component to the playground registry.'}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Component, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { RotateCcw, Search, X } from 'lucide-react';
import { playgroundRegistry } from './registry';

const SELECTED_COMPONENT_KEY = 'product-studio-playground-selection';

function getCategoryId(category: string) {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

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
  const [query, setQuery] = useState('');
  const [isRestoringSelection, setIsRestoringSelection] = useState(true);

  useEffect(() => {
    try {
      const savedId = window.localStorage.getItem(SELECTED_COMPONENT_KEY);
      const restoredEntry = playgroundRegistry.find((entry) => entry.id === savedId);
      setSelectedId(restoredEntry?.id ?? playgroundRegistry[0]?.id ?? '');
    } catch {
      setSelectedId(playgroundRegistry[0]?.id ?? '');
    } finally {
      setIsRestoringSelection(false);
    }
  }, []);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredEntries = playgroundRegistry.filter((entry) =>
    `${entry.label} ${entry.id} ${entry.description}`.toLocaleLowerCase().includes(normalizedQuery)
  );

  const categories = [...new Set(filteredEntries.map((entry) => entry.category))];
  const selectedEntry = playgroundRegistry.find((entry) => entry.id === selectedId);
  const SelectedComponent = selectedEntry?.Component;

  function selectComponent(id: string) {
    setSelectedId(id);
    setRetryCount(0);
    try {
      window.localStorage.setItem(SELECTED_COMPONENT_KEY, id);
    } catch {
      // The current selection still works when browser storage is unavailable.
    }
  }

  function resetPreview() {
    setRetryCount((count) => count + 1);
  }

  return (
    <section className="playground-workspace" aria-labelledby="playground-heading">
      <div className="playground-heading">
        <div>
          <p className="eyebrow">COMPONENT WORKSPACE</p>
          <h1 id="playground-heading">Playground</h1>
        </div>
        <span className="component-count" aria-label={`${playgroundRegistry.length} components available`}>
          {playgroundRegistry.length} components
        </span>
      </div>

      <div className="playground-workbench">
        <aside className="component-explorer" aria-label="Component explorer">
          <div className="explorer-search">
            <Search size={16} aria-hidden="true" />
            <input
              id="component-search"
              type="search"
              aria-label="Search components"
              placeholder="Search components"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                className="clear-search"
                type="button"
                aria-label="Clear component search"
                onClick={() => setQuery('')}
              >
                <X size={15} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="explorer-list" aria-label="Available components">
            {categories.length ? categories.map((category) => (
              <section className="component-group" key={category} aria-labelledby={getCategoryId(category)}>
                <h2 id={getCategoryId(category)} className="component-category">{category}</h2>
                <ul>
                  {filteredEntries.filter((entry) => entry.category === category).map((entry) => (
                    <li key={entry.id}>
                      <button
                        className={`component-option${entry.id === selectedId ? ' is-selected' : ''}`}
                        type="button"
                        aria-pressed={entry.id === selectedId}
                        onClick={() => selectComponent(entry.id)}
                      >
                        <span className="component-option-label">{entry.label}</span>
                        <span className="component-option-description">{entry.description}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )) : (
              <div className="explorer-empty" role="status">
                <strong>No components found</strong>
                <p>Try another name or search term.</p>
              </div>
            )}
          </div>
        </aside>

        <section className="preview-workspace" aria-label="Selected component preview">
          <div className="preview-header">
            <div className="preview-identity" aria-live="polite">
              <span className="preview-status-dot" aria-hidden="true" />
              <div>
                <p className="preview-caption">LIVE PREVIEW</p>
                <h2>{selectedEntry?.label ?? 'Select a component'}</h2>
                {selectedEntry && <p className="preview-description">{selectedEntry.description}</p>}
              </div>
            </div>
            <button
              className="reset-preview"
              type="button"
              onClick={resetPreview}
              disabled={!selectedEntry}
              aria-label="Reset preview"
              title="Reset preview"
            >
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="playground-preview" aria-label="Component preview canvas">
            {SelectedComponent && selectedEntry ? (
              <PreviewErrorBoundary
                key={`${selectedEntry.id}-${retryCount}`}
                onRetry={resetPreview}
              >
                <SelectedComponent />
              </PreviewErrorBoundary>
            ) : (
              <div className="playground-empty" role="status">
                <strong>{isRestoringSelection ? 'Restoring your last selection' : playgroundRegistry.length ? 'Choose a component to preview' : 'No preview components registered'}</strong>
                <p>{isRestoringSelection ? 'Loading the saved component preview.' : playgroundRegistry.length ? 'Select an example from the component explorer.' : 'Add an imported component to the registry.'}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

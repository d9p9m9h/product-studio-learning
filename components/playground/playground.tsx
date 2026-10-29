'use client';

import { Component, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Command, Grid2X2, Monitor, RotateCcw, Search, Smartphone, Star, Tablet, X } from 'lucide-react';
import { playgroundRegistry } from './registry';

const SELECTED_COMPONENT_KEY = 'product-studio-playground-selection';
const FAVORITES_KEY = 'product-studio-playground-favorites';
const RECENT_COMPONENTS_KEY = 'product-studio-playground-recent';
const RECENT_COMPONENT_LIMIT = 4;

type DiscoveryMode = 'all' | 'favorites';
type PreviewSize = 'desktop' | 'tablet' | 'mobile';

const componentIds = new Set(playgroundRegistry.map((entry) => entry.id));

function isValidComponentId(id: string | null): id is string {
  return id !== null && componentIds.has(id);
}

function readStoredIds(key: string): string[] {
  try {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) return [];

    const parsedValue: unknown = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) return [];

    const ids: unknown[] = parsedValue;
    return [...new Set(ids.filter(
      (id): id is string => typeof id === 'string' && componentIds.has(id)
    ))];
  } catch {
    return [];
  }
}

function writeComponentToUrl(id: string, method: 'push' | 'replace') {
  const url = new URL(window.location.href);
  url.searchParams.set('component', id);
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (nextUrl !== currentUrl) window.history[`${method}State`](null, '', nextUrl);
}

function rememberComponent(ids: string[], id: string): string[] {
  return [id, ...ids.filter((recentId) => recentId !== id)].slice(0, RECENT_COMPONENT_LIMIT);
}

function isEditableTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && (
    target.isContentEditable ||
    target.closest('input, textarea, select, [contenteditable="true"]') !== null
  );
}

function getCategoryId(category: string) {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function getSafeErrorMessage(error: unknown): string {
  if (!(error instanceof Error) || !error.message.trim()) {
    return 'An unexpected rendering error occurred.';
  }

  return error.message.replace(/\s+/g, ' ').slice(0, 180);
}

export class PreviewErrorBoundary extends Component<
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
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [discoveryMode, setDiscoveryMode] = useState<DiscoveryMode>('all');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [previewSize, setPreviewSize] = useState<PreviewSize>('desktop');
  const [isGridVisible, setIsGridVisible] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const paletteInputRef = useRef<HTMLInputElement>(null);
  const paletteDialogRef = useRef<HTMLDialogElement>(null);
  const paletteReturnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let savedId: string | null = null;
    try {
      savedId = window.localStorage.getItem(SELECTED_COMPONENT_KEY);
    } catch {
      // URL and default selection remain available without browser storage.
    }

    const urlId = new URLSearchParams(window.location.search).get('component');
    const initialId = isValidComponentId(urlId)
      ? urlId
      : isValidComponentId(savedId)
        ? savedId
        : playgroundRegistry[0]?.id ?? '';

    setSelectedId(initialId);
    setFavoriteIds(readStoredIds(FAVORITES_KEY));
    setRecentIds(rememberComponent(readStoredIds(RECENT_COMPONENTS_KEY), initialId));
    if (initialId) writeComponentToUrl(initialId, 'replace');
    setIsRestoringSelection(false);

    function handlePopState() {
      const requestedId = new URLSearchParams(window.location.search).get('component');
      let restoredSavedId: string | null = null;
      try {
        restoredSavedId = window.localStorage.getItem(SELECTED_COMPONENT_KEY);
      } catch {
        // Continue with the first registered example.
      }

      const nextId = isValidComponentId(requestedId)
        ? requestedId
        : isValidComponentId(restoredSavedId)
          ? restoredSavedId
          : playgroundRegistry[0]?.id ?? '';

      setSelectedId(nextId);
      if (nextId) {
        setRecentIds((currentIds) => rememberComponent(currentIds, nextId));
        if (!isValidComponentId(requestedId)) writeComponentToUrl(nextId, 'replace');
      }
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isRestoringSelection || !selectedId) return;
    try {
      window.localStorage.setItem(SELECTED_COMPONENT_KEY, selectedId);
    } catch {
      // Selection remains available for the current page session.
    }
  }, [isRestoringSelection, selectedId]);

  useEffect(() => {
    if (isRestoringSelection) return;
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
      window.localStorage.setItem(RECENT_COMPONENTS_KEY, JSON.stringify(recentIds));
    } catch {
      // Discovery features continue to work in memory when storage is unavailable.
    }
  }, [favoriteIds, isRestoringSelection, recentIds]);

  useEffect(() => {
    if (!isPaletteOpen) {
      paletteReturnFocusRef.current?.focus();
      paletteReturnFocusRef.current = null;
      return;
    }

    const dialog = paletteDialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    paletteInputRef.current?.focus();
  }, [isPaletteOpen]);

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (
          !isPaletteOpen &&
          query &&
          (!isEditableTarget(event.target) || event.target === searchInputRef.current)
        ) {
          event.preventDefault();
          setQuery('');
        }
        return;
      }

      if (isEditableTarget(event.target)) return;

      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      if ((event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        paletteReturnFocusRef.current = document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
        setPaletteQuery('');
        setIsPaletteOpen(true);
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isPaletteOpen, query]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredEntries = playgroundRegistry.filter((entry) => {
    const matchesQuery = `${entry.label} ${entry.id} ${entry.category} ${entry.description} ${entry.concepts.join(' ')} ${entry.whatToNotice} ${entry.practiceChallenge}`
      .toLowerCase()
      .includes(normalizedQuery);
    const matchesMode = discoveryMode === 'all' || favoriteIds.includes(entry.id);
    return matchesQuery && matchesMode;
  });

  const categories = [...new Set(filteredEntries.map((entry) => entry.category))];
  const selectedEntry = playgroundRegistry.find((entry) => entry.id === selectedId);
  const SelectedComponent = selectedEntry?.Component;
  const isSelectedFilteredOut = Boolean(
    selectedEntry && !filteredEntries.some((entry) => entry.id === selectedEntry.id)
  );
  const recentEntries = recentIds
    .map((id) => playgroundRegistry.find((entry) => entry.id === id))
    .filter((entry) => entry !== undefined);
  const normalizedPaletteQuery = paletteQuery.trim().toLowerCase();
  const paletteEntries = playgroundRegistry.filter((entry) =>
    `${entry.label} ${entry.id} ${entry.category} ${entry.description} ${entry.concepts.join(' ')}`
      .toLowerCase()
      .includes(normalizedPaletteQuery)
  );

  function selectComponent(id: string) {
    if (!isValidComponentId(id)) return;
    setSelectedId(id);
    setRetryCount(0);
    setRecentIds((currentIds) => rememberComponent(currentIds, id));
    writeComponentToUrl(id, 'push');
    closePalette();
  }

  function toggleFavorite(id: string) {
    setFavoriteIds((currentIds) => currentIds.includes(id)
      ? currentIds.filter((favoriteId) => favoriteId !== id)
      : [...currentIds, id]);
  }

  function clearFilters() {
    setQuery('');
    setDiscoveryMode('all');
  }

  function openPalette() {
    paletteReturnFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setPaletteQuery('');
    setIsPaletteOpen(true);
  }

  function closePalette() {
    if (paletteDialogRef.current?.open) paletteDialogRef.current.close();
    setIsPaletteOpen(false);
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
        <span
          className="component-count"
          role="status"
          aria-live="polite"
          aria-label={`${playgroundRegistry.length} total components, ${filteredEntries.length} shown`}
        >
          {playgroundRegistry.length} total · {filteredEntries.length} shown
        </span>
      </div>

      <div className="playground-workbench">
        <aside className="component-explorer" aria-label="Component explorer">
          <div className="explorer-tools">
            <div className="explorer-search">
              <Search size={17} aria-hidden="true" />
              <label className="sr-only" htmlFor="component-search">Search components</label>
              <input
                ref={searchInputRef}
                id="component-search"
                type="search"
                placeholder="Search components"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <span className="search-hint" aria-hidden="true">/</span>
              {query && (
                <button
                  className="clear-search"
                  type="button"
                  aria-label="Clear component search"
                  onClick={() => setQuery('')}
                >
                  <X size={17} aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              className="command-shortcut"
              type="button"
              onClick={openPalette}
              aria-label="Open component command palette, Control or Command K"
              title="Open command palette (Ctrl/Cmd+K)"
            >
              <Command size={16} aria-hidden="true" />
              <kbd>K</kbd>
            </button>
          </div>

          <div className="explorer-filters" role="group" aria-label="Component list filter">
            <button
              type="button"
              className="explorer-filter"
              aria-pressed={discoveryMode === 'all'}
              onClick={() => setDiscoveryMode('all')}
            >
              All <span>{playgroundRegistry.length}</span>
            </button>
            <button
              type="button"
              className="explorer-filter"
              aria-pressed={discoveryMode === 'favorites'}
              onClick={() => setDiscoveryMode('favorites')}
            >
              <Star size={15} aria-hidden="true" /> Favorites <span>{favoriteIds.length}</span>
            </button>
          </div>

          {isSelectedFilteredOut && selectedEntry && (
            <div className="selected-filter-notice" role="status">
              <span>Previewing <strong>{selectedEntry.label}</strong>, outside these results.</span>
              <button type="button" onClick={clearFilters}>Show selected</button>
            </div>
          )}

          {recentEntries.length > 0 && (
            <section className="recent-components" aria-labelledby="recent-components-heading">
              <h2 id="recent-components-heading">Recently viewed</h2>
              <div className="recent-component-list">
                {recentEntries.map((entry) => (
                  <button
                    type="button"
                    key={entry.id}
                    aria-current={entry.id === selectedId ? 'true' : undefined}
                    onClick={() => selectComponent(entry.id)}
                  >
                    {entry.label}
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="explorer-list" aria-label="Available components">
            {categories.length ? categories.map((category) => (
              <section className="component-group" key={category} aria-labelledby={getCategoryId(category)}>
                <h2 id={getCategoryId(category)} className="component-category">{category}</h2>
                <ul>
                  {filteredEntries.filter((entry) => entry.category === category).map((entry) => {
                    const isFavorite = favoriteIds.includes(entry.id);
                    return (
                      <li className="component-option-row" key={entry.id}>
                        <button
                          className={`component-option${entry.id === selectedId ? ' is-selected' : ''}`}
                          type="button"
                          aria-pressed={entry.id === selectedId}
                          onClick={() => selectComponent(entry.id)}
                        >
                          <span className="component-option-label">{entry.label}</span>
                          <span className="component-option-description">{entry.description}</span>
                        </button>
                        <button
                          className={`favorite-toggle${isFavorite ? ' is-favorite' : ''}`}
                          type="button"
                          aria-label={`${isFavorite ? 'Remove' : 'Add'} ${entry.label} ${isFavorite ? 'from' : 'to'} favorites`}
                          aria-pressed={isFavorite}
                          onClick={() => toggleFavorite(entry.id)}
                        >
                          <Star size={17} aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )) : (
              <div className="explorer-empty" role="status">
                <strong>{discoveryMode === 'favorites' && favoriteIds.length === 0 ? 'No favorites yet' : 'No components found'}</strong>
                <p>{discoveryMode === 'favorites' && favoriteIds.length === 0
                  ? 'Use the star beside a component to save it here.'
                  : 'Try another search or clear the current filters.'}</p>
                {(query || discoveryMode === 'favorites') && (
                  <button className="clear-filters" type="button" onClick={clearFilters}>Clear filters</button>
                )}
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
              aria-label="Reset preview to its initial state"
              title="Reset preview to its initial state"
            >
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="preview-toolbar" role="group" aria-label="Preview controls">
            <div className="preview-size-control" role="group" aria-label="Preview width">
              <button type="button" className="preview-size-button" aria-pressed={previewSize === 'desktop'} onClick={() => setPreviewSize('desktop')}>
                <Monitor size={16} aria-hidden="true" /> Desktop
              </button>
              <button type="button" className="preview-size-button" aria-pressed={previewSize === 'tablet'} onClick={() => setPreviewSize('tablet')}>
                <Tablet size={16} aria-hidden="true" /> Tablet
              </button>
              <button type="button" className="preview-size-button" aria-pressed={previewSize === 'mobile'} onClick={() => setPreviewSize('mobile')}>
                <Smartphone size={16} aria-hidden="true" /> Mobile
              </button>
            </div>
            <button
              className="preview-grid-toggle"
              type="button"
              aria-pressed={isGridVisible}
              onClick={() => setIsGridVisible((visible) => !visible)}
              aria-label={`${isGridVisible ? 'Hide' : 'Show'} preview canvas grid`}
              title={`${isGridVisible ? 'Hide' : 'Show'} preview canvas grid`}
            >
              <Grid2X2 size={16} aria-hidden="true" />
              Grid {isGridVisible ? 'on' : 'off'}
            </button>
          </div>

          <div className={`playground-preview${isGridVisible ? '' : ' is-grid-hidden'}`} aria-label="Component preview canvas">
            <div className={`preview-width-frame preview-width-${previewSize}`}>
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
          </div>

          {selectedEntry && (
            <section className="learning-details" aria-labelledby="learning-details-heading">
              <div className="learning-details-heading">
                <div>
                  <p className="eyebrow">LEARNING NOTES</p>
                  <h2 id="learning-details-heading">Understand this example</h2>
                </div>
                {selectedEntry.sourceLink ? (
                  <a
                    className="source-file-link"
                    href={selectedEntry.sourceLink.href}
                    aria-label={`View ${selectedEntry.label} source on GitHub`}
                  >
                    {selectedEntry.sourceLink.label}
                  </a>
                ) : (
                  <span className="source-file-label">Source</span>
                )}
              </div>
              <div className="learning-details-grid">
                <div>
                  <h3>Concepts</h3>
                  <ul className="concept-list">
                    {selectedEntry.concepts.map((concept) => <li key={concept}>{concept}</li>)}
                  </ul>
                </div>
                <div>
                  <h3>What to notice</h3>
                  <p>{selectedEntry.whatToNotice}</p>
                </div>
                <div>
                  <h3>Try next</h3>
                  <p>{selectedEntry.practiceChallenge}</p>
                </div>
                <div id="source-file">
                  <h3>Source file</h3>
                  <code>{selectedEntry.sourcePath}</code>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>

      <p className="playground-shortcut-hint">
        Press <kbd>/</kbd> to search or <kbd>Ctrl/Cmd</kbd> + <kbd>K</kbd> to open the component palette.
      </p>

      {isPaletteOpen && (
        <dialog
          ref={paletteDialogRef}
          className="command-palette"
          aria-labelledby="command-palette-heading"
          onCancel={(event) => {
            event.preventDefault();
            closePalette();
          }}
          onClose={() => setIsPaletteOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePalette();
          }}
        >
          <div className="command-palette-content">
            <div className="command-palette-heading">
              <div>
                <p className="eyebrow">COMPONENT PALETTE</p>
                <h2 id="command-palette-heading">Jump to an example</h2>
              </div>
              <button className="command-palette-close" type="button" onClick={closePalette} aria-label="Close component palette">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <label className="command-search" htmlFor="command-search-input">
              <Search size={17} aria-hidden="true" />
              <input
                ref={paletteInputRef}
                id="command-search-input"
                type="search"
                placeholder="Search examples and concepts"
                aria-label="Search examples and concepts"
                value={paletteQuery}
                onChange={(event) => setPaletteQuery(event.target.value)}
              />
            </label>
            <ul className="command-result-list">
              {paletteEntries.length ? paletteEntries.map((entry) => (
                <li key={entry.id}>
                  <button type="button" onClick={() => selectComponent(entry.id)}>
                    <span>{entry.label}</span>
                    <small>{entry.category} · {entry.description}</small>
                  </button>
                </li>
              )) : (
                <li className="command-empty" role="status">No matching examples.</li>
              )}
            </ul>
            <p className="command-palette-footer"><kbd>Esc</kbd> to close</p>
          </div>
        </dialog>
      )}
    </section>
  );
}

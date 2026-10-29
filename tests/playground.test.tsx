import { useState } from 'react';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Playground, PreviewErrorBoundary } from '@/components/playground/playground';
import { playgroundRegistry } from '@/components/playground/registry';
import { ThemeToggle } from '@/components/theme-toggle';

const FAVORITES_KEY = 'product-studio-playground-favorites';
const RECENT_COMPONENTS_KEY = 'product-studio-playground-recent';
const SELECTED_COMPONENT_KEY = 'product-studio-playground-selection';
const initialMatchMedia = window.matchMedia;

async function renderPlayground(url = '/') {
  window.history.replaceState(null, '', url);
  const { unmount } = render(<Playground />);
  await screen.findByRole('heading', { name: 'Playground', level: 1 });
  await waitFor(() => {
    expect(window.location.search).toContain('component=');
  });
  return unmount;
}

function getPreview() {
  return within(screen.getByRole('region', { name: 'Selected component preview' }));
}

function getExplorer() {
  return within(screen.getByRole('complementary', { name: 'Component explorer' }));
}

function getComponentList() {
  const componentList = screen
    .getByRole('complementary', { name: 'Component explorer' })
    .querySelector('.explorer-list');
  if (!(componentList instanceof HTMLElement)) {
    throw new Error('The component list is missing from the explorer.');
  }
  return within(componentList);
}

describe('Playground learning sources', () => {
  it('links every registered example to its existing source on the active repository branch', () => {
    for (const entry of playgroundRegistry) {
      expect(existsSync(path.resolve(process.cwd(), entry.sourcePath))).toBe(true);
      expect(entry.sourceLink?.href).toBe(
        `https://github.com/d9p9m9h/product-studio-learning/blob/master/${entry.sourcePath}`
      );
    }
  });
});

describe('Playground interactions', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
  });

  afterEach(() => {
    window.matchMedia = initialMatchMedia;
  });

  it('searches and filters examples, reports the count, and clears empty results', async () => {
    const user = userEvent.setup();
    await renderPlayground();

    const search = screen.getByRole('searchbox', { name: 'Search components' });
    await user.type(search, 'counter');

    expect(screen.getByText('8 total · 1 shown')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Interactions' })).toBeTruthy();
    expect(screen.getByRole('button', { name: /^Interactive counter/ })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /^Product form/ })).toBeNull();

    await user.clear(search);
    await user.type(search, 'no matching example');
    expect(screen.getByText('No components found')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(search).toHaveProperty('value', '');
    expect(screen.getByText('8 total · 8 shown')).toBeTruthy();
  });

  it('renders every registered preview with its learning notes and source link', async () => {
    const user = userEvent.setup();
    await renderPlayground();

    for (const entry of playgroundRegistry) {
      await user.click(getComponentList().getByText(entry.label, { exact: true }));

      expect(
        getPreview().getAllByRole('heading', { name: entry.label, level: 2 }).length
      ).toBeGreaterThan(0);
      expect(screen.getByRole('heading', { name: 'Understand this example' })).toBeTruthy();
      expect(
        screen.getByRole('link', { name: `View ${entry.label} source on GitHub` })
      ).toHaveProperty('href', entry.sourceLink?.href);
    }
  });

  it('selects an example, updates the query, and loads a valid query selection', async () => {
    const user = userEvent.setup();
    let unmount = await renderPlayground();

    await user.click(screen.getByRole('button', { name: /^Product form/ }));
    expect(window.location.search).toBe('?component=product-form');
    expect(getPreview().getByRole('heading', { name: 'Product details' })).toBeTruthy();
    expect(window.localStorage.getItem(SELECTED_COMPONENT_KEY)).toBe('product-form');

    unmount();
    unmount = await renderPlayground();
    expect(getPreview().getByRole('heading', { name: 'Product details' })).toBeTruthy();

    unmount();
    await renderPlayground('/?component=counter');
    expect(getPreview().getByText('Count: 0')).toBeTruthy();
  });

  it('falls back safely from an invalid URL ID and an unavailable stored selection', async () => {
    window.localStorage.setItem(SELECTED_COMPONENT_KEY, 'not-a-component');
    window.localStorage.setItem(FAVORITES_KEY, '{malformed');
    window.localStorage.setItem(RECENT_COMPONENTS_KEY, JSON.stringify({ invalid: true }));
    await renderPlayground('/?component=unknown');

    expect(window.location.search).toBe('?component=conditional-rendering');
    expect(getPreview().getByRole('heading', { name: 'Upload status' })).toBeTruthy();
    await userEvent.setup().click(getExplorer().getByRole('button', { name: /^Favorites/ }));
    expect(screen.getByText('No favorites yet')).toBeTruthy();
  });

  it('restores component selection for browser back and forward navigation', async () => {
    const user = userEvent.setup();
    await renderPlayground();

    await user.click(screen.getByRole('button', { name: /^Product form/ }));
    await user.click(screen.getByRole('button', { name: /^LikeButton/ }));
    expect(window.location.search).toBe('?component=LikeButton');

    window.history.back();
    await waitFor(() => {
      expect(window.location.search).toBe('?component=product-form');
    });
    expect(getPreview().getByRole('heading', { name: 'Product details' })).toBeTruthy();

    window.history.forward();
    await waitFor(() => {
      expect(window.location.search).toBe('?component=LikeButton');
    });
    expect(getPreview().getByRole('button', { name: /like 99/i })).toBeTruthy();
  });

  it('deduplicates malformed stored IDs and persists favorites between mounts', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(['counter', 'counter', 'missing', 1]));
    window.localStorage.setItem(
      RECENT_COMPONENTS_KEY,
      JSON.stringify(['counter', 'counter', 'missing', 1])
    );
    const unmount = await renderPlayground();
    unmount();
    const remount = await renderPlayground();
    const recent = screen.getByRole('region', { name: 'Recently viewed' });
    expect(within(recent).getAllByRole('button', { name: 'Interactive counter' })).toHaveLength(1);

    await user.click(getExplorer().getByRole('button', { name: /^Favorites/ }));
    expect(getComponentList().getByRole('button', { name: /^Interactive counter/ })).toBeTruthy();
    expect(getComponentList().queryByRole('button', { name: /^Product form/ })).toBeNull();

    await user.click(getExplorer().getByRole('button', { name: /^All/ }));
    await user.click(getExplorer().getByRole('button', { name: 'Add Product form to favorites' }));
    expect(JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? '[]')).toEqual([
      'counter',
      'product-form',
    ]);

    remount();
    await renderPlayground();
    await user.click(getExplorer().getByRole('button', { name: /^Favorites/ }));
    expect(getComponentList().getByRole('button', { name: /^Product form/ })).toBeTruthy();
  });

  it('resets the active preview to its initial component state', async () => {
    const user = userEvent.setup();
    await renderPlayground('/?component=counter');

    await user.click(getPreview().getByRole('button', { name: 'Increment' }));
    expect(getPreview().getByText('Count: 1')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Reset preview to its initial state' }));
    expect(getPreview().getByText('Count: 0')).toBeTruthy();
  });

  it('switches preview widths and toggles the canvas grid', async () => {
    const user = userEvent.setup();
    await renderPlayground();

    const preview = screen.getByLabelText('Component preview canvas');
    const mobileButton = screen.getByRole('button', { name: 'Mobile' });
    await user.click(mobileButton);
    expect(mobileButton.getAttribute('aria-pressed')).toBe('true');
    expect(preview.querySelector('.preview-width-mobile')).toBeTruthy();

    const tabletButton = screen.getByRole('button', { name: 'Tablet' });
    await user.click(tabletButton);
    expect(tabletButton.getAttribute('aria-pressed')).toBe('true');
    expect(preview.querySelector('.preview-width-tablet')).toBeTruthy();

    const desktopButton = screen.getByRole('button', { name: 'Desktop' });
    await user.click(desktopButton);
    expect(desktopButton.getAttribute('aria-pressed')).toBe('true');
    expect(preview.querySelector('.preview-width-desktop')).toBeTruthy();

    const gridToggle = screen.getByRole('button', { name: 'Hide preview canvas grid' });
    await user.click(gridToggle);
    expect(preview.classList.contains('is-grid-hidden')).toBe(true);
    expect(
      screen.getByRole('button', { name: 'Show preview canvas grid' }).getAttribute('aria-pressed')
    ).toBe('false');
  });

  it('retries a failed preview after the error-boundary action', async () => {
    const user = userEvent.setup();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    function FailingPreview({ shouldFail }: { shouldFail: boolean }) {
      if (shouldFail) throw new Error('Preview failed for testing.');
      return <p>Preview recovered.</p>;
    }

    function RetryablePreview() {
      const [retryCount, setRetryCount] = useState(0);
      const [shouldFail, setShouldFail] = useState(true);

      return (
        <PreviewErrorBoundary
          key={retryCount}
          onRetry={() => {
            setShouldFail(false);
            setRetryCount((count) => count + 1);
          }}
        >
          <FailingPreview shouldFail={shouldFail} />
        </PreviewErrorBoundary>
      );
    }

    render(<RetryablePreview />);
    expect(screen.getByRole('alert').textContent).toContain('Preview failed for testing.');
    await user.click(screen.getByRole('button', { name: 'Retry preview' }));
    expect(screen.getByText('Preview recovered.')).toBeTruthy();
    consoleError.mockRestore();
  });

  it('supports slash search and the command palette shortcut with focus restoration', async () => {
    const user = userEvent.setup();
    await renderPlayground();

    fireEvent.keyDown(window, { key: '/' });
    const search = screen.getByRole('searchbox', { name: 'Search components' });
    expect(document.activeElement).toBe(search);

    await user.click(getExplorer().getByRole('button', { name: /^Product form/ }));
    const selectedButton = getExplorer().getByRole('button', { name: /^Product form/, pressed: true });
    selectedButton.focus();
    await user.keyboard('{Control>}k{/Control}');

    const dialog = screen.getByRole('dialog', { name: 'Jump to an example' });
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(document.activeElement).toBe(
      screen.getByRole('searchbox', { name: 'Search examples and concepts' })
    );

    fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
    expect(document.activeElement).toBe(selectedButton);
  });

  it('continues to use the theme toggle when storage and matchMedia are unavailable', async () => {
    const user = userEvent.setup();
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: undefined,
    });
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage is unavailable', 'SecurityError');
    });
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage is unavailable', 'SecurityError');
    });

    render(<ThemeToggle />);
    const toggle = screen.getByRole('button', { name: 'Switch to dark theme' });
    await user.click(toggle);

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeTruthy();
  });

  it('restores a saved theme and respects the system preference when no theme is saved', async () => {
    window.localStorage.setItem('product-studio-theme', 'dark');
    const { unmount } = render(<ThemeToggle />);
    await screen.findByRole('button', { name: 'Switch to light theme' });
    expect(document.documentElement.dataset.theme).toBe('dark');

    unmount();
    window.localStorage.removeItem('product-studio-theme');
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    render(<ThemeToggle />);

    await screen.findByRole('button', { name: 'Switch to light theme' });
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});

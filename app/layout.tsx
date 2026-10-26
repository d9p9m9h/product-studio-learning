import type { Metadata } from 'next';
import Link from 'next/link';
import { ThemeToggle } from '../components/theme-toggle';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Product Studio — Learning Workspace',
    template: '%s | Product Studio'
  },
  description: 'A progressive project for learning React, TypeScript, Next.js, and Zod.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="topbar">
            <Link href="/" className="brand" aria-label="Product Studio home">
              <span className="brand-mark" aria-hidden="true">P</span>
              <span className="brand-copy">
                <strong>Product Studio</strong>
                <small>FULL-STACK LEARNING PROJECT</small>
              </span>
            </Link>
            <nav className="top-nav" aria-label="Main navigation">
              <Link href="/products">Products</Link>
              <Link href="/roadmap">Learning roadmap</Link>
            </nav>
            <ThemeToggle />
            <span className="phase-chip"><span /> Phase 2 · TypeScript bridge</span>
          </header>
          <main>{children}</main>
          <footer className="site-footer">
            <span>Learn by building. Understand before you move on.</span>
            <span>React · TypeScript · Next.js · Zod</span>
          </footer>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ThemeToggle } from '../components/theme-toggle';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Product Studio — Component Playground',
    template: '%s | Product Studio'
  },
  description: 'Explore and interact with reusable React components and learning examples.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <div className="app-shell">
          <header className="topbar">
            <Link href="/" className="brand" aria-label="Product Studio home">
              <span className="brand-mark" aria-hidden="true">P</span>
              <span className="brand-copy">
                <strong>Product Studio</strong>
                <small>COMPONENT WORKSPACE</small>
              </span>
            </Link>
            <span className="workspace-label">Playground</span>
            <ThemeToggle />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

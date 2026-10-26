import Link from 'next/link';
import { starterProducts } from '@/lib/products';

const learningBlocks = [
  {
    number: '01',
    title: 'React interactions',
    body: 'Components, props, state, forms, and event-driven UI.',
    tone: 'mint'
  },
  {
    number: '02',
    title: 'TypeScript contracts',
    body: 'Model product data, inferred types, unions, and component props.',
    tone: 'blue'
  },
  {
    number: '03',
    title: 'Zod validation',
    body: 'Validate raw input at runtime before it becomes trusted data.',
    tone: 'amber'
  },
  {
    number: '04',
    title: 'Next.js full stack',
    body: 'Routes, server/client boundaries, data flows, errors, and deployment.',
    tone: 'violet'
  }
];

export default function HomePage() {
  return (
    <div className="page-wrap">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR LEARNING PROJECT</p>
          <h1>Build products.<br /><em>Build your skills.</em></h1>
          <p className="hero-description">
            A real app that grows as you learn React, TypeScript, Next.js, and Zod.
            We’ll add features in small steps, explaining the data flow before adding complexity.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/products/new">Continue current lesson <span aria-hidden="true">↗</span></Link>
            <Link className="button button-secondary" href="/roadmap">View learning roadmap</Link>
          </div>
          <div className="stack-line">
            <span>REACT</span><span>·</span><span>TYPESCRIPT</span><span>·</span><span>NEXT.JS APP ROUTER</span><span>·</span><span>ZOD</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Illustration of product cards">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="floating-tag tag-top">TYPE-SAFE DATA <span>↗</span></div>
          <div className="mock-product-card">
            <div className="mock-product-visual"><span className="mock-star">✳</span><span className="mock-product-code">PRODUCT / 001</span></div>
            <div className="mock-product-details"><div><span className="mock-muted">FEATURED PRODUCT</span><strong>Studio Keyboard</strong></div><strong className="mock-price">$79.50</strong></div>
            <div className="mock-progress"><span /></div>
            <div className="mock-card-footer"><span>MODEL VALIDATED</span><span className="tiny-check">✓</span></div>
          </div>
          <div className="floating-tag tag-bottom"><span className="pulse-dot" /> STEP BY STEP, NOT ALL AT ONCE</div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><p className="eyebrow">THE TOOLKIT</p><h2>One project. Four core layers.</h2></div>
          <p>Each tool solves a different problem.<br />We’ll connect them when the time is right.</p>
        </div>
        <div className="learning-grid">
          {learningBlocks.map((block) => (
            <article className="learning-card" key={block.number}>
              <div className={`learning-icon ${block.tone}`}>{block.number}</div>
              <h3>{block.title}</h3>
              <p>{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block inventory-section">
        <div className="section-heading">
          <div><p className="eyebrow">STARTING DATA</p><h2>Small inventory, big learning potential.</h2></div>
          <Link className="text-link" href="/products">Explore products <span aria-hidden="true">→</span></Link>
        </div>
        <div className="product-table panel">
          <div className="product-table-head"><span>PRODUCT</span><span>PRICE</span><span>STATUS</span></div>
          {starterProducts.map((product) => (
            <div className="product-row" key={product.id}>
              <div className="product-cell-name"><span className="product-avatar">{product.name.slice(0, 1)}</span><div><strong>{product.name}</strong><small>{product.id}</small></div></div>
              <span className="product-cell-price">${product.price.toFixed(2)}</span>
              <span><span className={`status-pill status-${product.status}`}>{product.status}</span></span>
            </div>
          ))}
        </div>
        <p className="data-disclaimer">These are starter/mock records. A database and persistent create/edit/delete flow will be added in a later learning milestone.</p>
      </section>
    </div>
  );
}

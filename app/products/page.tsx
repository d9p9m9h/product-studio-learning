import type { Metadata } from 'next';
import Link from 'next/link';
import { starterProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Products'
};

export default function ProductsPage() {
  return (
    <div className="page-wrap subpage-wrap">
      <div className="section-heading products-heading">
        <div><p className="eyebrow">CATALOGUE</p><h1>Products</h1><p className="subpage-intro">A small typed data set to practice rendering arrays and reading domain models.</p></div>
        <Link className="button button-primary" href="/products/new">+ New product</Link>
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
      <div className="future-feature-note"><strong>Coming later in the learning path</strong><p>Search, URL parameters, pagination, database-backed data, create/edit/delete actions, loading/error states, and authentication will be implemented as separate lessons.</p></div>
    </div>
  );
}

import { useState } from 'react';
import type { ReactElement } from 'react';
import { Button } from '../ui/button';
import { starterProducts, type Product } from '@/lib/products';
import { LikeButton } from "@/components/ui/LikeButton";

const buttonVariants = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const;
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


export function LikeButtonPreview() {
  return (
    <div className="p-4 flex items-center justify-center">
      <LikeButton />
    </div>
  );
}

export function ButtonVariantsPreview(): ReactElement {
  return (
    <section className="panel" aria-labelledby="button-variants-heading">
      <div className="panel-heading p-5">
        <div>
          <p className="eyebrow">BUTTON COMPONENT</p>
          <h2 id="button-variants-heading">Button variants</h2>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 p-5">
        {buttonVariants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant[0].toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </div>
    </section>
  );
}

export function CounterPreview(): ReactElement {
  const [count, setCount] = useState<number>(0);

  return (
    <section className="panel p-5" aria-labelledby="counter-preview-heading">
      <p className="eyebrow">INTERACTIVE PREVIEW</p>
      <h2 id="counter-preview-heading">Counter</h2>
      <p className="preview-price" aria-live="polite">Count: {count}</p>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => setCount((currentCount) => currentCount - 1)}>
          Decrement
        </Button>
        <Button onClick={() => setCount((currentCount) => currentCount + 1)}>
          Increment
        </Button>
        <Button variant="ghost" onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>
    </section>
  );
}

export function ProductSummaryPreview(): ReactElement {
  const totalValue = starterProducts.reduce((total: number, product: Product) => total + product.price, 0);

  return (
    <section className="panel product-table" aria-labelledby="product-summary-heading">
      <div className="panel-heading p-5">
        <div>
          <p className="eyebrow">STARTER CATALOG</p>
          <h2 id="product-summary-heading">Product summary</h2>
        </div>
        <span className="status-pill status-learning">{starterProducts.length} items</span>
      </div>
      <div className="product-table-head" aria-hidden="true">
        <span>PRODUCT</span>
        <span>PRICE</span>
        <span>STATUS</span>
      </div>
      {starterProducts.map((product: Product) => (
        <div className="product-row" key={product.id}>
          <div className="product-cell-name">
            <span className="product-avatar" aria-hidden="true">{product.name[0]}</span>
            <div>
              <strong>{product.name}</strong>
              <small>{product.id}</small>
            </div>
          </div>
          <span className="product-cell-price">{currencyFormatter.format(product.price)}</span>
          <span className={`status-pill status-${product.status}`}>{product.status}</span>
        </div>
      ))}
      <div className="panel-heading p-5">
        <strong>Catalog value</strong>
        <strong>{currencyFormatter.format(totalValue)}</strong>
      </div>
    </section>
  );
}
'use client';

import { z } from 'zod';
import { useState } from 'react';
import { Button } from './ui/button';
import type { ProductDraft } from '@/lib/products';


type ValidationStatus = 'idle' | 'success' | 'error';

function ProductPreview({ draft }: { draft: ProductDraft }) {
  const hasName = draft.name.trim().length > 0;
  const hasPrice = draft.price.trim().length > 0;

  return (
    <aside className="preview-card" aria-live="polite">
      <div className="preview-topline">
        <span className="eyebrow">LIVE PREVIEW</span>
        <span className="preview-dot" aria-hidden="true" />
      </div>
      <div className="preview-art" aria-hidden="true">
        <span>✳</span>
      </div>
      <p className="preview-label">Product name</p>
      <h2 className="preview-name">{hasName ? draft.name : 'Your next product'}</h2>
      <p className="preview-label">Price</p>
      <p className="preview-price">{hasPrice ? `$${draft.price}` : 'Add a price'}</p>
      <p className="preview-footnote">
        Preview follows the form state. Validation checks the raw draft before it is trusted.
      </p>
    </aside>
  );
}

const ProductSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  price: z.coerce.number().positive('Price must be greater than 0'),
});

type ValidatedProduct = z.infer<typeof ProductSchema>;

export function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('idle');
  const [feedback, setFeedback] = useState('');

  const draft: ProductDraft = { name, price };

  function validateHandler() {
    const result = ProductSchema.safeParse(draft);

    if (result.success) {
      const product: ValidatedProduct = result.data;
      setName(product.name);
      setPrice(product.price.toFixed(2));
      setValidationStatus('success');
      setFeedback(`Valid product: ${product.name} for $${product.price.toFixed(2)}`);
      return;
    }

    setValidationStatus('error');
    setFeedback(result.error.issues[0]?.message ?? 'Please check the product details.');
  }

  return (
    <div className="form-layout">
      <section className="panel form-panel" aria-labelledby="product-form-heading">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">MILESTONE 01</p>
            <h2 id="product-form-heading">Product details</h2>
          </div>
          <span className="status-pill status-learning">Learning</span>
        </div>

        <p className="panel-copy">
          Each controlled input stores a string. Zod checks the draft at runtime and converts
          the price into a number only when validation succeeds.
        </p>

        <div className="field-stack">
          <div className="field">
            <label htmlFor="product-name">Product name</label>
            <input
              id="product-name"
              name="name"
              autoComplete="off"
              placeholder="e.g. Studio Keyboard"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setValidationStatus('idle');
                setFeedback('');
              }}
              aria-invalid={validationStatus === 'error' && !name.trim()}
            />
            <span className="field-help">Enter a name that is not empty.</span>
          </div>

          <div className="field">
            <label htmlFor="product-price">Price</label>
            <div className="price-input-wrap">
              <span aria-hidden="true">$</span>
              <input
                id="product-price"
                name="price"
                inputMode="decimal"
                autoComplete="off"
                placeholder="49.99"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                  setValidationStatus('idle');
                  setFeedback('');
                }}
                aria-invalid={validationStatus === 'error' && (!price.trim() || Number(price) <= 0 || !Number.isFinite(Number(price)))}
              />
            </div>
            <span className="field-help">Enter a number greater than 0.</span>
          </div>
        </div>

        <div style={{ padding: '0', margin: '0' }}>
          <Button onClick={validateHandler} style={{ marginTop: '18px' }}>
            Validate product
          </Button>
          {
            validationStatus !== 'idle' && (
              <p
                className="preview-price"
                role="status"
                aria-live="polite"
                data-status={validationStatus}
              >
                {feedback}
              </p>
            )
          }
        </div>

        <div className="lesson-note">
          <span className="lesson-note-icon" aria-hidden="true">→</span>
          <div>
            <strong>Runtime validation with Zod</strong>
            <p>Use <code>safeParse()</code> to separate raw form input from trusted, validated data.</p>
          </div>
        </div>
      </section>

      <ProductPreview draft={draft} />
    </div>
  );
}

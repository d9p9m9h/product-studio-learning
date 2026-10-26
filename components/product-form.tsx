'use client';

import { useState } from 'react';
import type { ProductDraft } from '@/lib/products';
import { negative, number, string, z } from 'zod';

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
        Preview follows the form state. Runtime validation is the next milestone.
      </p>
    </aside>
  );
}

const ProductSchema = z.object({
  name: z.string().trim().min(0.01, 'Name is required'),
  price: z.coerce.number().positive(),
});

type ValidateProduct = z.infer<typeof ProductSchema>;

export function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [feedback, setFeedback] = useState('');

  const draft: ProductDraft = { name, price };

  function validateHandler() {
    const result = ProductSchema.safeParse(draft);

    if (result.success) {
      setName(result.data.name);

      setPrice(String(result.data.price.toFixed(2)));

      setFeedback(`Valid product: ${result.data.name} for $${result.data.price.toFixed(2)}`);
    } else {
      setFeedback(result.error.issues[0]?.message ?? 'Try Again' );
    }
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
          Start with controlled inputs. Each field stores a string in React state;
          we will validate and convert the data in the next step.
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
              onChange={(event) => setName(event.target.value)}
            />
            <span className="field-help">A name is currently just text — validation comes next.</span>
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
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <span className="field-help">Kept as a string so the form can capture raw input.</span>
          </div>
        </div>

        <div style={{ padding: "0", margin: "0" }}>
          <button onClick={(validateHandler)} style={{ marginTop: "18px" }}>
            validation
          </button>
          <span className='preview-price'> {feedback} </span>
        </div>

        <div className="lesson-note">
          <span className="lesson-note-icon" aria-hidden="true">→</span>
          <div>
            <strong>Next step: Zod validation</strong>
            <p>Use <code>safeParse()</code> to decide whether this draft can become a trusted Product.</p>
          </div>
        </div>
      </section>

      <ProductPreview draft={draft} />
    </div>
  );
}

/**
 * Domain types for the Product Studio learning app.
 * `price` is a number in trusted application data. Raw form input remains a string
 * until the Zod validation milestone proves that it can be converted safely.
 */
export type ProductStatus = 'active' | 'draft' | 'archived';

export type Product = {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
};

export type ProductDraft = {
  name: string;
  price: string;
};

export const starterProducts: Product[] = [
  { id: 'prd-001', name: 'Studio Keyboard', price: 79.5, status: 'active' },
  { id: 'prd-002', name: 'Desk Lamp', price: 34, status: 'active' },
  { id: 'prd-003', name: 'Notebook Set', price: 12.99, status: 'draft' }
];

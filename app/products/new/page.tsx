import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductForm } from '@/components/product-form';

export const metadata: Metadata = {
  title: 'Create a product'
};

export default function NewProductPage() {
  return (
    <div className="page-wrap subpage-wrap">
      <Link href="/products" className="back-link"><span aria-hidden="true">←</span> All products</Link>
      <section className="subpage-heading">
        <p className="eyebrow">REACT STATE & EVENTS</p>
        <h1>Create your first product</h1>
        <p>Explore controlled inputs, a live preview, and Zod runtime validation with typed feedback.</p>
      </section>
      <ProductForm />
    </div>
  );
}

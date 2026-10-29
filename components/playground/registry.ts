import type { ComponentType } from "react";
import { ProductForm } from "@/components/product-form";
import { LikeButton } from "@/components/ui/LikeButton";
import { ConditionalRenderingPreview } from "./conditional-rendering-preview";
import { ConditionalBranchPreview } from "./conditional-branch-preview";
import {
  ButtonPreview,
  ButtonVariantsPreview,
  CounterPreview,
  ProductSummaryPreview,
} from "./previews";

export type PlaygroundCategory =
  | 'Rendering'
  | 'Forms'
  | 'UI primitives'
  | 'Interactions'
  | 'Data display';

export type PlaygroundEntry = {
  id: string;
  label: string;
  category: PlaygroundCategory;
  description: string;
  concepts: readonly string[];
  whatToNotice: string;
  practiceChallenge: string;
  sourcePath: string;
  sourceLink?: { label: string; href: string };
  Component: ComponentType;
};

export const playgroundRegistry: readonly PlaygroundEntry[] = [
  {
    id: 'conditional-rendering',
    label: 'Conditional rendering (&&)',
    category: 'Rendering',
    description: 'Show UI only when a condition is true.',
    concepts: ['Boolean expressions', 'Conditional JSX', 'State-driven rendering'],
    whatToNotice: 'The success message exists only while the status is success.',
    practiceChallenge: 'Add a message that appears only for the error status.',
    sourcePath: 'components/playground/conditional-rendering-preview.tsx',
    sourceLink: {
      label: 'View source on GitHub',
      href: 'https://github.com/d9p9m9h/product-studio-learning/blob/master/components/playground/conditional-rendering-preview.tsx',
    },
    Component: ConditionalRenderingPreview,
  },
  {
    id: 'conditional-branch',
    label: 'Conditional branches (ternary)',
    category: 'Rendering',
    description: 'Switch between interface states with a ternary expression.',
    concepts: ['Ternary expressions', 'Multiple UI states', 'State transitions'],
    whatToNotice: 'Each status maps to a different message, with one fallback branch.',
    practiceChallenge: 'Add a fourth connection state and choose its display message.',
    sourcePath: 'components/playground/conditional-branch-preview.tsx',
    sourceLink: {
      label: 'View source on GitHub',
      href: 'https://github.com/d9p9m9h/product-studio-learning/blob/master/components/playground/conditional-branch-preview.tsx',
    },
    Component: ConditionalBranchPreview,
  },
  {
    id: "product-form",
    label: "Product form",
    category: 'Forms',
    description: 'Controlled inputs with runtime validation using Zod.',
    concepts: ['Controlled inputs', 'Runtime validation', 'Input and domain types'],
    whatToNotice: 'The draft stays string-based until Zod validates and coerces the price.',
    practiceChallenge: 'Add an optional description field and decide how it should be validated.',
    sourcePath: 'components/product-form.tsx',
    sourceLink: {
      label: 'View source on GitHub',
      href: 'https://github.com/d9p9m9h/product-studio-learning/blob/master/components/product-form.tsx',
    },
    Component: ProductForm,
  },
  {
    id: "Button",
    label: "Button",
    category: 'UI primitives',
    description: 'Interact with a single button and its pressed state.',
    concepts: ['Reusable components', 'Component state', 'Accessible button state'],
    whatToNotice: 'The preview exposes the interaction state with aria-pressed.',
    practiceChallenge: 'Add a disabled state that is reflected in both appearance and behavior.',
    sourcePath: 'components/playground/previews.tsx',
    sourceLink: {
      label: 'View source on GitHub',
      href: 'https://github.com/d9p9m9h/product-studio-learning/blob/master/components/playground/previews.tsx',
    },
    Component: ButtonPreview,
  },
  {
    id: "button-variants",
    label: "Button variants",
    category: 'UI primitives',
    description: 'Compare the available visual styles for the Button component.',
    concepts: ['Component variants', 'Prop-driven styling', 'Reusable UI primitives'],
    whatToNotice: 'Each button shares one component API while its variant changes presentation.',
    practiceChallenge: 'Choose a variant for a secondary action and explain your choice.',
    sourcePath: 'components/playground/previews.tsx',
    sourceLink: {
      label: 'View source on GitHub',
      href: 'https://github.com/d9p9m9h/product-studio-learning/blob/master/components/playground/previews.tsx',
    },
    Component: ButtonVariantsPreview,
  },
  {
    id: "counter",
    label: "Interactive counter",
    category: 'Interactions',
    description: 'Update local component state with button events.',
    concepts: ['useState', 'Event handlers', 'Functional state updates'],
    whatToNotice: 'Each click derives the next value from the previous state.',
    practiceChallenge: 'Prevent the counter from going below zero without changing its initial value.',
    sourcePath: 'components/playground/previews.tsx',
    sourceLink: {
      label: 'View source on GitHub',
      href: 'https://github.com/d9p9m9h/product-studio-learning/blob/master/components/playground/previews.tsx',
    },
    Component: CounterPreview,
  },
  {
    id: "product-summary",
    label: "Product summary",
    category: 'Data display',
    description: 'Render typed product records and calculate a total.',
    concepts: ['Typed data', 'Array rendering', 'reduce'],
    whatToNotice: 'One typed product list drives both the rows and the calculated catalog value.',
    practiceChallenge: 'Add a count of published products using the existing product data.',
    sourcePath: 'components/playground/previews.tsx',
    sourceLink: {
      label: 'View source on GitHub',
      href: 'https://github.com/d9p9m9h/product-studio-learning/blob/master/components/playground/previews.tsx',
    },
    Component: ProductSummaryPreview,
  },
  {
    id: "LikeButton",
    label: "LikeButton",
    category: 'Interactions',
    description: 'Increase a like count with local component state.',
    concepts: ['Component state', 'Click events', 'Functional state updates'],
    whatToNotice: 'Each click derives the next count from the previous state.',
    practiceChallenge: 'Add an unlike action and prevent the count from falling below zero.',
    sourcePath: 'components/ui/LikeButton.tsx',
    sourceLink: {
      label: 'View source on GitHub',
      href: 'https://github.com/d9p9m9h/product-studio-learning/blob/master/components/ui/LikeButton.tsx',
    },
    Component: LikeButton,
  },
];
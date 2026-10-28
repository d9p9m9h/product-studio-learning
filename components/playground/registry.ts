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
  Component: ComponentType;
};

export const playgroundRegistry = [
  {
    id: 'conditional-rendering',
    label: 'Conditional rendering (&&)',
    category: 'Rendering',
    description: 'Show UI only when a condition is true.',
    Component: ConditionalRenderingPreview,
  },
  {
    id: 'conditional-branch',
    label: 'Conditional branches (ternary)',
    category: 'Rendering',
    description: 'Switch between interface states with a ternary expression.',
    Component: ConditionalBranchPreview,
  },
  {
    id: "product-form",
    label: "Product form",
    category: 'Forms',
    description: 'Controlled inputs with runtime validation using Zod.',
    Component: ProductForm,
  },
  {
    id: "Button",
    label: "Button",
    category: 'UI primitives',
    description: 'Interact with a single button and its pressed state.',
    Component: ButtonPreview,
  },
  {
    id: "button-variants",
    label: "Button variants",
    category: 'UI primitives',
    description: 'Compare the available visual styles for the Button component.',
    Component: ButtonVariantsPreview,
  },
  {
    id: "counter",
    label: "Interactive counter",
    category: 'Interactions',
    description: 'Update local component state with button events.',
    Component: CounterPreview,
  },
  {
    id: "product-summary",
    label: "Product summary",
    category: 'Data display',
    description: 'Render typed product records and calculate a total.',
    Component: ProductSummaryPreview,
  },
  {
    id: "LikeButton",
    label: "LikeButton",
    category: 'Interactions',
    description: 'A compact button that toggles its liked state.',
    Component: LikeButton,
  },
] satisfies readonly PlaygroundEntry[];
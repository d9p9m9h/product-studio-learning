import { useState } from "react";
import type { ComponentType } from "react";
import { ProductForm } from "@/components/product-form";
import { Button } from "../ui/button";
import { LikeButton } from "@/components/ui/LikeButton";
import { ConditionalRenderingPreview } from "./conditional-rendering-preview";
import {
  ButtonVariantsPreview,
  CounterPreview,
  ProductSummaryPreview,
} from "./previews";

export type PlaygroundEntry = {
  id: string;
  label: string;
  Component: ComponentType;
};

export const playgroundRegistry = [

  {
    id: 'conditional-rendering',
    label: 'Conditional rendering (&&)',
    Component: ConditionalRenderingPreview,
  },
  {
    id: "product-form",
    label: "Product form",
    Component: ProductForm,
  },
  {
    id: "Button",
    label: "Button",
    Component: Button,
  },
  {
    id: "button-variants",
    label: "Button variants",
    Component: ButtonVariantsPreview,
  },
  {
    id: "counter",
    label: "Interactive counter",
    Component: CounterPreview,
  },
  {
    id: "product-summary",
    label: "Product summary",
    Component: ProductSummaryPreview,
  },
  {
    id: "LikeButton",
    label: "LikeButton",
    Component: LikeButton,
  },
] satisfies readonly PlaygroundEntry[];

export const playgroundScope = {
  useState,
  ProductForm,
  Button,
  LikeButton,
}
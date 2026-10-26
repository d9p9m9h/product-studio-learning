import { useState } from "react";
import type { ComponentType } from "react";
import { Button } from "../ui/button";
import { ProductForm } from "@/components/product-form";
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
] satisfies readonly PlaygroundEntry[];

export const playgroundScope = {
  useState,
  ProductForm,
  Button,
}
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// IMPORTANT FOR SHADCN COMPONENTS - DO NOT DELETE THIS FILE
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

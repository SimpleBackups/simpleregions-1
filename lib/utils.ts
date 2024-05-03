import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jsonToPhpArray(json: string) {
  const obj = JSON.parse(json);
  return `[
    ${Object.keys(obj)
      .map((key) => `"${key}" => "${obj[key]}",`)
      .join("\n\t")}\n]`;
}

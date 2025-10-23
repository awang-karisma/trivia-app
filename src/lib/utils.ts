import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateSHA256Hash(message: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => `00${b.toString(16)}`.slice(-2))
    .join("");

  return hashHex;
}

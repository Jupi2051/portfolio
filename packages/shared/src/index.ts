// Shared utilities and constants
export const API_ENDPOINTS = {
  TRPC: "/trpc",
  HEALTH: "/health",
} as const;

export const APP_CONFIG = {
  NAME: "Portfolio",
  VERSION: "1.0.0",
  DESCRIPTION: "A modern portfolio application",
} as const;

// Utility functions
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Validation schemas
export { z } from "zod";

import invariant from "tiny-invariant";
import type { Product } from "../types/product";

const API_URL = process.env.API_URL || "http://api.plt.local";
console.log(API_URL);

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API Error: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  return handleResponse<Product[]>(response);
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);
  return handleResponse<Product>(response);
}

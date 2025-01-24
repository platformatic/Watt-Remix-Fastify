import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getProduct } from "../utils/api.server";
import type { Product } from "../types/product";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Product ID is required", { status: 400 });
  }
    
  try {
    const product = await getProduct(id);
    return json({ product });
  } catch (error) {
    if (error instanceof Error && "status" in error && error.status === 404) {
      throw new Response("Product not found", { status: 404 });
    }
    throw new Response("Failed to load product", { status: 500 });
  }
}

export default function ProductDetails() {
  const { product } = useLoaderData<{ product: Product }>();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-96 overflow-hidden">
          <img
            src={
              product.image_url
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="mb-6">
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Back to Products
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="prose prose-lg text-gray-600 mb-8">
            {product.description}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500">
              Added {new Date(product.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getProducts } from "../utils/api.server";
import type { Product } from "../types/product";

export async function loader() {
  try {
    const products = await getProducts();
    return json({ products });
  } catch (error) {
    throw new Response("Failed to load products", { status: 500 });
  }
}

export default function Products() {
    const { products } = useLoaderData<{ products: Product[] }>();
      console.log("Products data:", products); 

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3">
              {products.map((product) => (
            console.log("Product data:", product),
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group transform hover:scale-105 transition-all"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img
                  src={ product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">View Details →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

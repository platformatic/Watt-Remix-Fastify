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

export default function Index() {
  const { products } = useLoaderData<{ products: Product[] }>();
  const featuredProduct = products[0];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-black">
      <div className="h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 grid md:grid-cols-2 gap-12">
          <div className="space-y-8 text-white flex flex-col justify-center">
            <div>
              <h1 className="text-6xl font-bold mb-6">
                {featuredProduct.name}
              </h1>
              <p className="text-xl text-blue-100">
                {featuredProduct.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-4xl font-bold text-blue-300">
                ${featuredProduct.price}
              </div>

              <div className="flex gap-4">
                <Link
                  to={`/products/${featuredProduct.id}`}
                  className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  View Details
                </Link>
                <Link
                  to="/products"
                  className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg font-semibold transition-all"
                >
                  Browse All
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="font-bold">High Performance</div>
                <div className="text-sm opacity-75">Gaming Ready</div>
              </div>
              <div className="text-center">
                <div className="font-bold">RGB Lighting</div>
                <div className="text-sm opacity-75">Customizable</div>
              </div>
              <div className="text-center">
                <div className="font-bold">Liquid Cooling</div>
                <div className="text-sm opacity-75">Temperature Control</div>
              </div>
            </div>
          </div>

          <div className="relative h-[700px] rounded-2xl overflow-hidden">
            <img
              src={featuredProduct.image_url || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7'}
              alt={featuredProduct.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

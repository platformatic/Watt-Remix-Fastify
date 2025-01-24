// app/root.tsx
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  Link,
} from "@remix-run/react";
import tailwindStyles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
];

export const meta: MetaFunction = () => {
  return [
    { title: "BuyBeta" },
    { name: "description", content: "Browse our amazing products!" },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex space-x-8">
                  <Link to="/" className="flex-shrink-0 flex items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Featured product
                    </span>
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
                  >
                    All Products
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <title>Oops!</title>
          <Meta />
          <Links />
        </head>
        <body>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-xl w-full space-y-8 p-10">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                  {error.status} {error.statusText}
                </h1>
                <p className="mt-2 text-lg text-gray-600">{error.data}</p>
                <Link
                  to="/"
                  className="mt-6 inline-block text-blue-600 hover:text-blue-800"
                >
                  Go back home
                </Link>
              </div>
            </div>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-xl w-full space-y-8 p-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900">
                Unexpected Error
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                An unexpected error occurred. Please try again later.
              </p>
              <Link
                to="/"
                className="mt-6 inline-block text-blue-600 hover:text-blue-800"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

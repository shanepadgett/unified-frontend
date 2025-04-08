import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation
} from "@remix-run/react";
import { AppNavigation } from "./components/AppNavigation";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { DefaultErrorBoundary } from "./core/errors/ErrorBoundary";
import { PageLoading } from "./core/ui/LoadingIndicator";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => [
  { title: "Unified Frontend" },
  { name: "description", content: "A unified frontend application" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-dark-900 dark:text-gray-200">

        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex flex-col min-h-screen dark:bg-dark-900">
      <AppNavigation />
      <main className="flex-1">
        {isLoading ? <PageLoading /> : <Outlet />}
      </main>
    </div>
  );
}

// Error boundary for the entire application
export function ErrorBoundary() {
  return <DefaultErrorBoundary />;
}

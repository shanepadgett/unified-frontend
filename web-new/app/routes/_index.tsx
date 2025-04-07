import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Unified Frontend" },
    { name: "description", content: "Feature Flag Management Platform" },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-dark-600 dark:bg-dark-800">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Unified Frontend Platform
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Welcome to the Feature Flag Management Platform. This application is currently in development.
        </p>
        <div className="rounded-md bg-primary-600 bg-opacity-10 p-4 text-primary-600 dark:bg-opacity-20">
          <p className="text-sm font-medium">
            Phase 3 implementation coming soon. Features will be added according to the conversion plan.
          </p>
        </div>
      </div>
    </div>
  );
}

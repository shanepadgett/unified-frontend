import { Environment } from "../types";

// Mock environment data for development
export const mockEnvironments: Environment[] = [
  {
    id: "1",
    name: "Development",
    description: "Development environment for testing new features",
    isDefault: true,
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2023-01-02T00:00:00Z"),
  },
  {
    id: "2",
    name: "Staging",
    description: "Staging environment for pre-production testing",
    isDefault: false,
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2023-01-02T00:00:00Z"),
  },
  {
    id: "3",
    name: "Production",
    description: "Production environment for live users",
    isDefault: false,
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2023-01-02T00:00:00Z"),
  },
];

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as EnvironmentsImport } from './routes/environments'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const EnvironmentsRoute = EnvironmentsImport.update({
  id: '/environments',
  path: '/environments',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/environments': {
      id: '/environments'
      path: '/environments'
      fullPath: '/environments'
      preLoaderRoute: typeof EnvironmentsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/environments': typeof EnvironmentsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/environments': typeof EnvironmentsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/environments': typeof EnvironmentsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/environments'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/environments'
  id: '__root__' | '/' | '/environments'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  EnvironmentsRoute: typeof EnvironmentsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  EnvironmentsRoute: EnvironmentsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/environments"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/environments": {
      "filePath": "environments.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

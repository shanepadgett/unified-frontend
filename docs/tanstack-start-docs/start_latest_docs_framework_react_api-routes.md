TanStackStart v0
Auto
Framework
![React logo](data:image/svg+xml,%3csvg%20viewBox='-11.5%20-10.23%2023%2020.46'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20fill='%2361dafb'%20r='2.05'/%3e%3cg%20fill='none'%20stroke='%2361dafb'%3e%3cellipse%20rx='11'%20ry='4.2'/%3e%3cellipse%20rx='11'%20ry='4.2'%20transform='matrix\(.5%20.8660254%20-.8660254%20.5%200%200\)'/%3e%3cellipse%20rx='11'%20ry='4.2'%20transform='matrix\(-.5%20.8660254%20-.8660254%20-.5%200%200\)'/%3e%3c/g%3e%3c/svg%3e)React
Version
Latest
Search
Menu
  * Home
  * GitHub 
  * Discord 


Getting Started
  * Overview
react
  * Getting Started
react
  * Quick Start
react
  * Build from Scratch
react
  * Learn the Basics
react
  * Server Functions
react
  * Static Server Functions
react
  * Middleware
react
  * API Routes
react
  * SSR
react
  * Hosting
react
  * Authentication
react
  * Databases
react
  * Observability
react
  * Static Prerendering
react
  * Path Aliases
react


Examples
  * Basic
react
  * Basic + React Query
react
  * Basic + Clerk Auth
react
  * Basic + DIY Auth
react
  * Basic + Supabase Auth
react
  * Trellaux + Convex
react
  * Trellaux
react
  * Material UI
react


TanStackStart v0
Auto
Framework
![React logo](data:image/svg+xml,%3csvg%20viewBox='-11.5%20-10.23%2023%2020.46'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20fill='%2361dafb'%20r='2.05'/%3e%3cg%20fill='none'%20stroke='%2361dafb'%3e%3cellipse%20rx='11'%20ry='4.2'/%3e%3cellipse%20rx='11'%20ry='4.2'%20transform='matrix\(.5%20.8660254%20-.8660254%20.5%200%200\)'/%3e%3cellipse%20rx='11'%20ry='4.2'%20transform='matrix\(-.5%20.8660254%20-.8660254%20-.5%200%200\)'/%3e%3c/g%3e%3c/svg%3e)React
Version
Latest
Menu
  * Home
  * GitHub 
  * Discord 


Getting Started
  * Overview
react
  * Getting Started
react
  * Quick Start
react
  * Build from Scratch
react
  * Learn the Basics
react
  * Server Functions
react
  * Static Server Functions
react
  * Middleware
react
  * API Routes
react
  * SSR
react
  * Hosting
react
  * Authentication
react
  * Databases
react
  * Observability
react
  * Static Prerendering
react
  * Path Aliases
react


Examples
  * Basic
react
  * Basic + React Query
react
  * Basic + Clerk Auth
react
  * Basic + DIY Auth
react
  * Basic + Supabase Auth
react
  * Trellaux + Convex
react
  * Trellaux
react
  * Material UI
react


On this page
  * File Route Conventions
  * Nested Directories vs File-names
  * Setting up the entry handler
  * Defining an API Route
  * Dynamic Path Params
  * Wildcard/Splat Param
  * Handling requests with a body
  * Responding with JSON
  * Using the `json` helper function
  * Responding with a status code
  * Setting headers in the response


# API Routes
API Routes are a powerful feature of TanStack Start that allow you to create server-side endpoints in your application without the need for a separate server. API Routes are useful for handling form submissions, user authentication, and more.
By default, API Routes are defined in your ./app/routes/api directory of your project and are automatically handled by the TanStack Start server.
> 🧠 This means that by default, your API Routes will be prefixed with /api and will be served from the same server as your application. You can customize this base path by changing the server.apiBaseURL in your TanStack Start config.
## File Route Conventions
API Routes in TanStack Start, follow the same file-based routing conventions as TanStack Router. This means that each file in your routes directory that is prefixed with api (which can be configured) will be treated as an API route. Here are a few examples:
  * routes/api.users.ts will create an API route at /api/users
  * routes/api/users.ts will **also** create an API route at /api/users
  * routes/api/users.index.ts will **also** create an API route at /api/users
  * routes/api/users/$id.ts will create an API route at /api/users/$id
  * routes/api/users/$id/posts.ts will create an API route at /api/users/$id/posts
  * routes/api.users.$id.posts.ts will **also** create an API route at /api/users/$id/posts
  * routes/api/file/$.ts will create an API route at /api/file/$


Your route files that are prefixed with api, can be thought of as the handlers for the given API route path.
It's important to remember that each route can only have a single handler file associated with it. So, if you have a file named routes/api/users.ts which'd equal the request path of /api/users, you cannot have other files that'd also resolve to the same route, like:
  * routes/api/users.index.ts
  * routes/api.users.ts.
  * routes/api.users.index.ts.


❗ One more thing, API Routes do not have the concept of pathless layout routes or parallel routes. So, a file named:
  * routes/api/_pathlessLayout/users.ts would resolve to /api/_pathlessLayout/users and **NOT** /api/users.


## Nested Directories vs File-names
In the examples above, you may have noticed that the file naming conventions are flexible and allow you to mix and match directories and file names. This is intentional and allows you to organize your API Routes in a way that makes sense for your application. You can read more about this in the TanStack Router File-based Routing Guide.
## Setting up the entry handler
Before you can create your API routes, you need to set up the entry handler for your TanStack Start project. This entry handler, similar to client and ssr, handles the API incoming requests and routes them to the appropriate API route handler. The API entry handler is defined in the app/api.ts file in your project.
Here's an example implementation:
ts
```
// app/api.ts
import {
 createStartAPIHandler,
 defaultAPIFileRouteHandler,
} from '@tanstack/react-start/api'
export default createStartAPIHandler(defaultAPIFileRouteHandler)

```
```
// app/api.ts
import {
 createStartAPIHandler,
 defaultAPIFileRouteHandler,
} from '@tanstack/react-start/api'
export default createStartAPIHandler(defaultAPIFileRouteHandler)

```

This file is responsible for creating the API handler that will be used to route incoming requests to the appropriate API route handler. The defaultAPIFileRouteHandler is a helper function that will automatically load and execute the appropriate API route handler based on the incoming request.
## Defining an API Route
API Routes export an APIRoute instance by calling the createAPIFileRoute function. Similar to other file-based routes in TanStack Router, the first argument to this function is the path of the route. The function returned is called again with an object that defines the route handlers for each HTTP method.
Tip
If you've already got the dev server running, when you create a new API route, it'll automatically have the initial handler set up for you. From there on, you can customize the handler as needed.
Note
The export variable must be named APIRoute or the resulting response will be a 404 not found.
ts
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  return new Response('Hello, World! from ' + request.url)
 },
})

```
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  return new Response('Hello, World! from ' + request.url)
 },
})

```

Each HTTP method handler receives an object with the following properties:
  * request: The incoming request object. You can read more about the Request object in the MDN Web Docs.
  * params: An object containing the dynamic path parameters of the route. For example, if the route path is /users/$id, and the request is made to /users/123, then params will be { id: '123' }. We'll cover dynamic path parameters and wildcard parameters later in this guide.


Once you've processed the request, you need to return a Response object or Promise<Response>. This can be done by creating a new Response object and returning it from the handler. You can read more about the Response object in the MDN Web Docs.
## Dynamic Path Params
API Routes support dynamic path parameters, which are denoted by a $ followed by the parameter name. For example, a file named routes/api/users/$id.ts will create an API route at /api/users/$id that accepts a dynamic id parameter.
ts
```
// routes/api/users/$id.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/users/$id')({
 GET: async ({ params }) => {
  const { id } = params
  return new Response(`User ID: ${id}`)
 },
})
// Visit /api/users/123 to see the response
// User ID: 123

```
```
// routes/api/users/$id.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/users/$id')({
 GET: async ({ params }) => {
  const { id } = params
  return new Response(`User ID: ${id}`)
 },
})
// Visit /api/users/123 to see the response
// User ID: 123

```

You can also have multiple dynamic path parameters in a single route. For example, a file named routes/api/users/$id/posts/$postId.ts will create an API route at /api/users/$id/posts/$postId that accepts two dynamic parameters.
ts
```
// routes/api/users/$id/posts/$postId.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/users/$id/posts/$postId')({
 GET: async ({ params }) => {
  const { id, postId } = params
  return new Response(`User ID: ${id}, Post ID: ${postId}`)
 },
})
// Visit /api/users/123/posts/456 to see the response
// User ID: 123, Post ID: 456

```
```
// routes/api/users/$id/posts/$postId.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/users/$id/posts/$postId')({
 GET: async ({ params }) => {
  const { id, postId } = params
  return new Response(`User ID: ${id}, Post ID: ${postId}`)
 },
})
// Visit /api/users/123/posts/456 to see the response
// User ID: 123, Post ID: 456

```

## Wildcard/Splat Param
API Routes also support wildcard parameters at the end of the path, which are denoted by a $ followed by nothing. For example, a file named routes/api/file/$.ts will create an API route at /api/file/$ that accepts a wildcard parameter.
ts
```
// routes/api/file/$.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/file/$')({
 GET: async ({ params }) => {
  const { _splat } = params
  return new Response(`File: ${_splat}`)
 },
})
// Visit /api/file/hello.txt to see the response
// File: hello.txt

```
```
// routes/api/file/$.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/file/$')({
 GET: async ({ params }) => {
  const { _splat } = params
  return new Response(`File: ${_splat}`)
 },
})
// Visit /api/file/hello.txt to see the response
// File: hello.txt

```

## Handling requests with a body
To handle POST requests,you can add a POST handler to the route object. The handler will receive the request object as the first argument, and you can access the request body using the request.json() method.
ts
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 POST: async ({ request }) => {
  const body = await request.json()
  return new Response(`Hello, ${body.name}!`)
 },
})
// Send a POST request to /api/hello with a JSON body like { "name": "Tanner" }
// Hello, Tanner!

```
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 POST: async ({ request }) => {
  const body = await request.json()
  return new Response(`Hello, ${body.name}!`)
 },
})
// Send a POST request to /api/hello with a JSON body like { "name": "Tanner" }
// Hello, Tanner!

```

This also applies to other HTTP methods like PUT, PATCH, and DELETE. You can add handlers for these methods in the route object and access the request body using the appropriate method.
It's important to remember that the request.json() method returns a Promise that resolves to the parsed JSON body of the request. You need to await the result to access the body.
This is a common pattern for handling POST requests in API Routes. You can also use other methods like request.text() or request.formData() to access the body of the request.
## Responding with JSON
When returning JSON using a Response object, this is a common pattern:
ts
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  return new Response(JSON.stringify({ message: 'Hello, World!' }), {
   headers: {
    'Content-Type': 'application/json',
   },
  })
 },
})
// Visit /api/hello to see the response
// {"message":"Hello, World!"}

```
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  return new Response(JSON.stringify({ message: 'Hello, World!' }), {
   headers: {
    'Content-Type': 'application/json',
   },
  })
 },
})
// Visit /api/hello to see the response
// {"message":"Hello, World!"}

```

## Using the json helper function
Or you can use the json helper function to automatically set the Content-Type header to application/json and serialize the JSON object for you.
ts
```
// routes/api/hello.ts
import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  return json({ message: 'Hello, World!' })
 },
})
// Visit /api/hello to see the response
// {"message":"Hello, World!"}

```
```
// routes/api/hello.ts
import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  return json({ message: 'Hello, World!' })
 },
})
// Visit /api/hello to see the response
// {"message":"Hello, World!"}

```

## Responding with a status code
You can set the status code of the response by either:
  * Passing it as a property of the second argument to the Response constructor
ts
```
// routes/api/hello.ts
import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/users/$id')({
 GET: async ({ request, params }) => {
  const user = await findUser(params.id)
  if (!user) {
   return new Response('User not found', {
    status: 404,
   })
  }
  return json(user)
 },
})

```
```
// routes/api/hello.ts
import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/users/$id')({
 GET: async ({ request, params }) => {
  const user = await findUser(params.id)
  if (!user) {
   return new Response('User not found', {
    status: 404,
   })
  }
  return json(user)
 },
})

```

  * Using the setResponseStatus helper function from @tanstack/react-start/server
ts
```
// routes/api/hello.ts
import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { setResponseStatus } from '@tanstack/react-start/server'
export const APIRoute = createAPIFileRoute('/users/$id')({
 GET: async ({ request, params }) => {
  const user = await findUser(params.id)
  if (!user) {
   setResponseStatus(404)
   return new Response('User not found')
  }
  return json(user)
 },
})

```
```
// routes/api/hello.ts
import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { setResponseStatus } from '@tanstack/react-start/server'
export const APIRoute = createAPIFileRoute('/users/$id')({
 GET: async ({ request, params }) => {
  const user = await findUser(params.id)
  if (!user) {
   setResponseStatus(404)
   return new Response('User not found')
  }
  return json(user)
 },
})

```



In this example, we're returning a 404 status code if the user is not found. You can set any valid HTTP status code using this method.
## Setting headers in the response
Sometimes you may need to set headers in the response. You can do this by either:
  * Passing an object as the second argument to the Response constructor.
ts
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  return new Response('Hello, World!', {
   headers: {
    'Content-Type': 'text/plain',
   },
  })
 },
})
// Visit /api/hello to see the response
// Hello, World!

```
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  return new Response('Hello, World!', {
   headers: {
    'Content-Type': 'text/plain',
   },
  })
 },
})
// Visit /api/hello to see the response
// Hello, World!

```

  * Or using the setHeaders helper function from @tanstack/react-start/server.
ts
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { setHeaders } from '@tanstack/react-start/server'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  setHeaders({
   'Content-Type': 'text/plain',
  })
  return new Response('Hello, World!')
 },
})

```
```
// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { setHeaders } from '@tanstack/react-start/server'
export const APIRoute = createAPIFileRoute('/api/hello')({
 GET: async ({ request }) => {
  setHeaders({
   'Content-Type': 'text/plain',
  })
  return new Response('Hello, World!')
 },
})

```



Edit on GitHub
Middleware
SSR
Our Partners
![Clerk](https://tanstack.com/_build/assets/clerk-logo-light-BYN-U_0H.svg)![Clerk](https://tanstack.com/_build/assets/clerk-logo-dark-CRE22T_2.svg)
![Netlify](data:image/svg+xml,%3csvg%20width='512'%20height='209'%20viewBox='0%200%20512%20209'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url\(%23clip0_235_8\)'%3e%3cpath%20d='M117.436%20207.036V154.604L118.529%20153.51H129.452L130.545%20154.604V207.036L129.452%20208.13H118.529L117.436%20207.036Z'%20fill='%2305BDBA'/%3e%3cpath%20d='M117.436%2053.5225V1.09339L118.529%200H129.452L130.545%201.09339V53.5225L129.452%2054.6159H118.529L117.436%2053.5225Z'%20fill='%2305BDBA'/%3e%3cpath%20d='M69.9539%20169.238H68.4094L60.6869%20161.512V159.967L78.7201%20141.938L86.8976%20141.942L87.9948%20143.031V151.209L69.9539%20169.238Z'%20fill='%2305BDBA'/%3e%3cpath%20d='M69.9462%2038.8917H68.4017L60.6792%2046.6181V48.1626L78.7124%2066.192L86.8899%2066.1882L87.9871%2065.0986V56.9212L69.9462%2038.8917Z'%20fill='%2305BDBA'/%3e%3cpath%20d='M1.09339%2097.5104H75.3711L76.4645%2098.6038V109.526L75.3711%20110.62H1.09339L0%20109.526V98.6038L1.09339%2097.5104Z'%20fill='%2305BDBA'/%3e%3cpath%20d='M440.999%2097.5104H510.91L512.004%2098.6038V109.526L510.91%20110.62H436.633L435.539%20109.526L439.905%2098.6038L440.999%2097.5104Z'%20fill='%2305BDBA'/%3e%3cpath%20d='M212.056%20108.727L210.963%20109.821H177.079L175.986%20110.914C175.986%20113.101%20178.173%20119.657%20186.916%20119.657C190.196%20119.657%20193.472%20118.564%20194.566%20116.377L195.659%20115.284H208.776L209.869%20116.377C208.776%20122.934%20203.313%20132.774%20186.916%20132.774C168.336%20132.774%20159.589%20119.657%20159.589%20104.357C159.589%2089.0576%20168.332%2075.9408%20185.822%2075.9408C203.313%2075.9408%20212.056%2089.0576%20212.056%20104.357V108.731V108.727ZM195.659%2097.7971C195.659%2096.7037%20194.566%2089.0538%20185.822%2089.0538C177.079%2089.0538%20175.986%2096.7037%20175.986%2097.7971L177.079%2098.8905H194.566L195.659%2097.7971Z'%20fill='%23014847'/%3e%3cpath%20d='M242.66%20115.284C242.66%20117.47%20243.753%20118.564%20245.94%20118.564H255.776L256.87%20119.657V130.587L255.776%20131.681H245.94C236.103%20131.681%20227.36%20127.307%20227.36%20115.284V91.2368L226.266%2090.1434H218.617L217.523%2089.05V78.1199L218.617%2077.0265H226.266L227.36%2075.9332V66.0965L228.453%2065.0031H241.57L242.663%2066.0965V75.9332L243.757%2077.0265H255.78L256.874%2078.1199V89.05L255.78%2090.1434H243.757L242.663%2091.2368V115.284H242.66Z'%20fill='%23014847'/%3e%3cpath%20d='M283.1%20131.681H269.983L268.889%20130.587V56.2636L269.983%2055.1702H283.1L284.193%2056.2636V130.587L283.1%20131.681Z'%20fill='%23014847'/%3e%3cpath%20d='M312.61%2068.2871H299.493L298.399%2067.1937V56.2636L299.493%2055.1702H312.61L313.703%2056.2636V67.1937L312.61%2068.2871ZM312.61%20131.681H299.493L298.399%20130.587V78.1237L299.493%2077.0304H312.61L313.703%2078.1237V130.587L312.61%20131.681Z'%20fill='%23014847'/%3e%3cpath%20d='M363.98%2056.2636V67.1937L362.886%2068.2871H353.05C350.863%2068.2871%20349.769%2069.3805%20349.769%2071.5672V75.9408L350.863%2077.0342H361.793L362.886%2078.1276V89.0576L361.793%2090.151H350.863L349.769%2091.2444V130.591L348.676%20131.684H335.559L334.466%20130.591V91.2444L333.372%2090.151H325.723L324.629%2089.0576V78.1276L325.723%2077.0342H333.372L334.466%2075.9408V71.5672C334.466%2059.5438%20343.209%2055.1702%20353.046%2055.1702H362.882L363.976%2056.2636H363.98Z'%20fill='%23014847'/%3e%3cpath%20d='M404.42%20132.774C400.046%20143.704%20395.677%20150.261%20380.373%20150.261H374.906L373.813%20149.167V138.237L374.906%20137.144H380.373C385.836%20137.144%20386.929%20136.05%20388.023%20132.77V131.677L370.536%2089.05V78.1199L371.63%2077.0265H381.466L382.56%2078.1199L395.677%20115.284H396.77L409.887%2078.1199L410.98%2077.0265H420.817L421.91%2078.1199V89.05L404.424%20132.77L404.42%20132.774Z'%20fill='%23014847'/%3e%3cpath%20d='M135.454%20131.681L134.361%20130.587L134.368%2098.9172C134.368%2093.4541%20132.22%2089.2182%20125.625%2089.0806C122.234%2088.9926%20118.354%2089.0729%20114.209%2089.2488L113.59%2089.8834L113.598%20130.587L112.504%20131.681H99.3913L98.2979%20130.587V77.5388L99.3913%2076.4454L128.901%2076.1778C143.685%2076.1778%20149.668%2086.3356%20149.668%2097.8009V130.587L148.575%20131.681H135.454Z'%20fill='%23014847'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_235_8'%3e%3crect%20width='512'%20height='208.126'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e)![Netlify](data:image/svg+xml,%3csvg%20width='512'%20height='209'%20viewBox='0%200%20512%20209'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url\(%23clip0_235_26\)'%3e%3cpath%20d='M117.436%20207.036V154.604L118.529%20153.51H129.452L130.545%20154.604V207.036L129.452%20208.13H118.529L117.436%20207.036Z'%20fill='%2332E6E2'/%3e%3cpath%20d='M117.436%2053.5225V1.09339L118.529%200H129.452L130.545%201.09339V53.5225L129.452%2054.6159H118.529L117.436%2053.5225Z'%20fill='%2332E6E2'/%3e%3cpath%20d='M69.9539%20169.238H68.4094L60.6869%20161.512V159.967L78.7201%20141.938L86.8976%20141.942L87.9948%20143.031V151.209L69.9539%20169.238Z'%20fill='%2332E6E2'/%3e%3cpath%20d='M69.9462%2038.8917H68.4017L60.6792%2046.6181V48.1626L78.7124%2066.192L86.8899%2066.1882L87.9871%2065.0986V56.9212L69.9462%2038.8917Z'%20fill='%2332E6E2'/%3e%3cpath%20d='M1.09339%2097.5104H75.3711L76.4645%2098.6038V109.526L75.3711%20110.62H1.09339L0%20109.526V98.6038L1.09339%2097.5104Z'%20fill='%2332E6E2'/%3e%3cpath%20d='M440.999%2097.5104H510.91L512.004%2098.6038V109.526L510.91%20110.62H436.633L435.539%20109.526L439.905%2098.6038L440.999%2097.5104Z'%20fill='%2332E6E2'/%3e%3cpath%20d='M212.056%20108.727L210.963%20109.821H177.079L175.986%20110.914C175.986%20113.101%20178.173%20119.657%20186.916%20119.657C190.196%20119.657%20193.472%20118.564%20194.566%20116.377L195.659%20115.284H208.776L209.869%20116.377C208.776%20122.934%20203.313%20132.774%20186.916%20132.774C168.336%20132.774%20159.589%20119.657%20159.589%20104.357C159.589%2089.0576%20168.332%2075.9408%20185.822%2075.9408C203.313%2075.9408%20212.056%2089.0576%20212.056%20104.357V108.731V108.727ZM195.659%2097.7971C195.659%2096.7037%20194.566%2089.0538%20185.822%2089.0538C177.079%2089.0538%20175.986%2096.7037%20175.986%2097.7971L177.079%2098.8905H194.566L195.659%2097.7971Z'%20fill='white'/%3e%3cpath%20d='M242.66%20115.284C242.66%20117.47%20243.753%20118.564%20245.94%20118.564H255.776L256.87%20119.657V130.587L255.776%20131.681H245.94C236.103%20131.681%20227.36%20127.307%20227.36%20115.284V91.2368L226.266%2090.1434H218.617L217.523%2089.05V78.1199L218.617%2077.0265H226.266L227.36%2075.9332V66.0965L228.453%2065.0031H241.57L242.663%2066.0965V75.9332L243.757%2077.0265H255.78L256.874%2078.1199V89.05L255.78%2090.1434H243.757L242.663%2091.2368V115.284H242.66Z'%20fill='white'/%3e%3cpath%20d='M283.1%20131.681H269.983L268.889%20130.587V56.2636L269.983%2055.1702H283.1L284.193%2056.2636V130.587L283.1%20131.681Z'%20fill='white'/%3e%3cpath%20d='M312.61%2068.2871H299.493L298.399%2067.1937V56.2636L299.493%2055.1702H312.61L313.703%2056.2636V67.1937L312.61%2068.2871ZM312.61%20131.681H299.493L298.399%20130.587V78.1237L299.493%2077.0304H312.61L313.703%2078.1237V130.587L312.61%20131.681Z'%20fill='white'/%3e%3cpath%20d='M363.98%2056.2636V67.1937L362.886%2068.2871H353.05C350.863%2068.2871%20349.769%2069.3805%20349.769%2071.5672V75.9408L350.863%2077.0342H361.793L362.886%2078.1276V89.0576L361.793%2090.151H350.863L349.769%2091.2444V130.591L348.676%20131.684H335.559L334.466%20130.591V91.2444L333.372%2090.151H325.723L324.629%2089.0576V78.1276L325.723%2077.0342H333.372L334.466%2075.9408V71.5672C334.466%2059.5438%20343.209%2055.1702%20353.046%2055.1702H362.882L363.976%2056.2636H363.98Z'%20fill='white'/%3e%3cpath%20d='M404.42%20132.774C400.046%20143.704%20395.677%20150.261%20380.373%20150.261H374.906L373.813%20149.167V138.237L374.906%20137.144H380.373C385.836%20137.144%20386.929%20136.05%20388.023%20132.77V131.677L370.536%2089.05V78.1199L371.63%2077.0265H381.466L382.56%2078.1199L395.677%20115.284H396.77L409.887%2078.1199L410.98%2077.0265H420.817L421.91%2078.1199V89.05L404.424%20132.77L404.42%20132.774Z'%20fill='white'/%3e%3cpath%20d='M135.454%20131.681L134.361%20130.587L134.368%2098.9172C134.368%2093.4541%20132.22%2089.2182%20125.625%2089.0806C122.234%2088.9926%20118.354%2089.0729%20114.209%2089.2488L113.59%2089.8834L113.598%20130.587L112.504%20131.681H99.3913L98.2979%20130.587V77.5388L99.3913%2076.4454L128.901%2076.1778C143.685%2076.1778%20149.668%2086.3356%20149.668%2097.8009V130.587L148.575%20131.681H135.454Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_235_26'%3e%3crect%20width='512'%20height='208.126'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e)
Official Deployment Partner
![Convex](data:image/svg+xml,%3csvg%20height='88.59'%20viewBox='0%200%20516.8%2088.59'%20width='516.8'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m467.88%2044.55-22.19-29.38h25.72l45.39%2059.77h-25.97l-10.09-13.37-10.09%2013.37h-25.85z'/%3e%3cpath%20d='m490.26%2015.17h25.6l-19.65%2026.17-13-16.77z'/%3e%3cpath%20d='m115.27%2068.32c-6.18-5.25-9.27-13.01-9.27-23.26s3.15-18.01%209.46-23.26c6.3-5.25%2014.92-7.88%2025.85-7.88%204.54%200%208.55.31%2012.04.95%203.49.63%206.83%201.7%2010.02%203.22v16.63c-4.96-2.35-10.59-3.53-16.89-3.53-5.55%200-9.65%201.05-12.29%203.15-2.65%202.1-3.97%205.67-3.97%2010.72s1.3%208.41%203.91%2010.59c2.6%202.19%206.72%203.28%2012.36%203.28%205.97%200%2011.64-1.39%2017.02-4.16v17.4c-5.97%202.69-13.41%204.03-22.32%204.03-11.11%200-19.74-2.63-25.92-7.88z'/%3e%3cpath%20d='m168.89%2045.05c0-10.17%202.9-17.9%208.7-23.2s14.54-7.94%2026.23-7.94%2020.57%202.65%2026.42%207.94c5.84%205.29%208.76%2013.03%208.76%2023.2%200%2020.76-11.73%2031.14-35.18%2031.14-23.29.01-34.93-10.37-34.93-31.14zm43.32%2010.6c1.72-2.19%202.58-5.72%202.58-10.59s-.86-8.3-2.58-10.53-4.52-3.34-8.39-3.34-6.52%201.12-8.2%203.34c-1.68%202.23-2.52%205.74-2.52%2010.53s.84%208.41%202.52%2010.59c1.68%202.19%204.41%203.28%208.2%203.28%203.87%200%206.66-1.1%208.39-3.28z'/%3e%3cpath%20d='m244.52%2015.17h22.19l.63%204.54c2.44-1.68%205.55-3.07%209.33-4.16s7.69-1.64%2011.73-1.64c7.48%200%2012.94%201.85%2016.39%205.55s5.17%209.41%205.17%2017.15v38.33h-23.7v-35.94c0-2.69-.61-4.62-1.83-5.8s-3.26-1.76-6.12-1.76c-1.76%200-3.57.4-5.42%201.2s-3.4%201.83-4.67%203.09v39.21h-23.7z'/%3e%3cpath%20d='m310.03%2015.17h24.71l11.35%2035.05%2011.35-35.05h24.71l-23.58%2059.77h-24.97z'/%3e%3cpath%20d='m389.61%2069.8c-7.12-5.34-10.45-14.61-10.45-24.62s2.65-17.78%208.7-23.33%2015.27-7.94%2026.91-7.94c10.71%200%2019.13%202.48%2025.28%207.44%206.14%204.96%209.22%2011.73%209.22%2020.3v10.47h-45.07c1.12%203.11%202.54%205.36%206.03%206.75s8.36%202.08%2014.59%202.08c3.72%200%207.52-.29%2011.38-.88%201.36-.21%203.6-.54%204.78-.79v14.53c-5.89%201.6-13.74%202.4-22.59%202.4-11.91-.01-21.66-1.07-28.78-6.41zm34.76-30.54c0-2.96-3.41-9.33-10.26-9.33-6.18%200-10.26%206.27-10.26%209.33z'/%3e%3cpath%20d='m55.59%2069.82c13.1-1.43%2025.45-8.29%2032.25-19.74-3.22%2028.32-34.73%2046.22-60.45%2035.23-2.37-1.01-4.41-2.69-5.81-4.85-5.78-8.92-7.68-20.27-4.95-30.57%207.8%2013.23%2023.66%2021.34%2038.96%2019.93z'%20fill='%23f3b01c'/%3e%3cpath%20d='m16.15%2041.58c-5.31%2012.06-5.54%2026.18.97%2037.8-22.91-16.94-22.66-53.19-.28-69.96%202.07-1.55%204.53-2.47%207.11-2.61%2010.61-.55%2021.39%203.48%2028.95%2010.99-15.36.15-30.32%209.82-36.75%2023.78z'%20fill='%238d2676'/%3e%3cpath%20d='m60.31%2021.51c-7.75-10.62-19.88-17.85-33.17-18.07%2025.69-11.46%2057.29%207.12%2060.73%2034.59.32%202.55-.1%205.15-1.25%207.45-4.8%209.58-13.7%2017.01-24.1%2019.76%207.62-13.89%206.68-30.86-2.21-43.73z'%20fill='%23ee342f'/%3e%3c/svg%3e)![Convex](data:image/svg+xml,%3csvg%20height='88.59'%20viewBox='0%200%20516.8%2088.59'%20width='516.8'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='%23fff'%3e%3cpath%20d='m467.88%2044.55-22.19-29.38h25.72l45.39%2059.77h-25.97l-10.09-13.37-10.09%2013.37h-25.85z'/%3e%3cpath%20d='m490.26%2015.17h25.6l-19.65%2026.17-13-16.77z'/%3e%3cpath%20d='m115.27%2068.32c-6.18-5.25-9.27-13.01-9.27-23.26s3.15-18.01%209.46-23.26c6.3-5.25%2014.92-7.88%2025.85-7.88%204.54%200%208.55.31%2012.04.95%203.49.63%206.83%201.7%2010.02%203.22v16.63c-4.96-2.35-10.59-3.53-16.89-3.53-5.55%200-9.65%201.05-12.29%203.15-2.65%202.1-3.97%205.67-3.97%2010.72s1.3%208.41%203.91%2010.59c2.6%202.19%206.72%203.28%2012.36%203.28%205.97%200%2011.64-1.39%2017.02-4.16v17.4c-5.97%202.69-13.41%204.03-22.32%204.03-11.11%200-19.74-2.63-25.92-7.88z'/%3e%3cpath%20d='m168.89%2045.05c0-10.17%202.9-17.9%208.7-23.2s14.54-7.94%2026.23-7.94%2020.57%202.65%2026.42%207.94c5.84%205.29%208.76%2013.03%208.76%2023.2%200%2020.76-11.73%2031.14-35.18%2031.14-23.29.01-34.93-10.37-34.93-31.14zm43.32%2010.6c1.72-2.19%202.58-5.72%202.58-10.59s-.86-8.3-2.58-10.53-4.52-3.34-8.39-3.34-6.52%201.12-8.2%203.34c-1.68%202.23-2.52%205.74-2.52%2010.53s.84%208.41%202.52%2010.59c1.68%202.19%204.41%203.28%208.2%203.28%203.87%200%206.66-1.1%208.39-3.28z'/%3e%3cpath%20d='m244.52%2015.17h22.19l.63%204.54c2.44-1.68%205.55-3.07%209.33-4.16s7.69-1.64%2011.73-1.64c7.48%200%2012.94%201.85%2016.39%205.55s5.17%209.41%205.17%2017.15v38.33h-23.7v-35.94c0-2.69-.61-4.62-1.83-5.8s-3.26-1.76-6.12-1.76c-1.76%200-3.57.4-5.42%201.2s-3.4%201.83-4.67%203.09v39.21h-23.7z'/%3e%3cpath%20d='m310.03%2015.17h24.71l11.35%2035.05%2011.35-35.05h24.71l-23.58%2059.77h-24.97z'/%3e%3cpath%20d='m389.61%2069.8c-7.12-5.34-10.45-14.61-10.45-24.62s2.65-17.78%208.7-23.33%2015.27-7.94%2026.91-7.94c10.71%200%2019.13%202.48%2025.28%207.44%206.14%204.96%209.22%2011.73%209.22%2020.3v10.47h-45.07c1.12%203.11%202.54%205.36%206.03%206.75s8.36%202.08%2014.59%202.08c3.72%200%207.52-.29%2011.38-.88%201.36-.21%203.6-.54%204.78-.79v14.53c-5.89%201.6-13.74%202.4-22.59%202.4-11.91-.01-21.66-1.07-28.78-6.41zm34.76-30.54c0-2.96-3.41-9.33-10.26-9.33-6.18%200-10.26%206.27-10.26%209.33z'/%3e%3cpath%20d='m55.59%2069.82c13.1-1.43%2025.45-8.29%2032.25-19.74-3.22%2028.32-34.73%2046.22-60.45%2035.23-2.37-1.01-4.41-2.69-5.81-4.85-5.78-8.92-7.68-20.27-4.95-30.57%207.8%2013.23%2023.66%2021.34%2038.96%2019.93z'/%3e%3cpath%20d='m16.15%2041.58c-5.31%2012.06-5.54%2026.18.97%2037.8-22.91-16.94-22.66-53.19-.28-69.96%202.07-1.55%204.53-2.47%207.11-2.61%2010.61-.55%2021.39%203.48%2028.95%2010.99-15.36.15-30.32%209.82-36.75%2023.78z'/%3e%3cpath%20d='m60.31%2021.51c-7.75-10.62-19.88-17.85-33.17-18.07%2025.69-11.46%2057.29%207.12%2060.73%2034.59.32%202.55-.1%205.15-1.25%207.45-4.8%209.58-13.7%2017.01-24.1%2019.76%207.62-13.89%206.68-30.86-2.21-43.73z'/%3e%3c/g%3e%3c/svg%3e)
![Sentry](data:image/svg+xml,%3csvg%20height='119'%20viewBox='0%200%20222%2066'%20width='400'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m29%202.26a4.67%204.67%200%200%200%20-8%200l-6.58%2011.27a32.21%2032.21%200%200%201%2017.75%2026.66h-4.62a27.68%2027.68%200%200%200%20-15.46-22.72l-6.09%2010.53a15.92%2015.92%200%200%201%209.23%2012.17h-10.61a.76.76%200%200%201%20-.62-1.11l2.94-5a10.74%2010.74%200%200%200%20-3.36-1.9l-2.91%205a4.54%204.54%200%200%200%201.69%206.24%204.66%204.66%200%200%200%202.26.6h14.53a19.4%2019.4%200%200%200%20-8-17.31l2.31-4a23.87%2023.87%200%200%201%2010.3%2021.31h12.31a35.88%2035.88%200%200%200%20-16.41-31.8l4.67-8a.77.77%200%200%201%201.05-.27c.53.29%2020.29%2034.77%2020.66%2035.17a.76.76%200%200%201%20-.68%201.13h-4.76q.09%201.91%200%203.81h4.78a4.59%204.59%200%200%200%204.62-4.61%204.49%204.49%200%200%200%20-.62-2.28zm95.32%2026.02-14.76-19.06h-3.68v25.55h3.73v-19.58l15.18%2019.58h3.26v-25.55h-3.73zm-37.17-4.74h13.23v-3.32h-13.24v-7.69h14.93v-3.32h-18.73v25.56h18.92v-3.32h-15.12zm-15.56-3.24c-5.15-1.24-6.59-2.22-6.59-4.6%200-2.14%201.89-3.59%204.71-3.59a12.06%2012.06%200%200%201%207.07%202.55l2-2.83a14.1%2014.1%200%200%200%20-9-3c-5.06%200-8.59%203-8.59%207.27%200%204.6%203%206.19%208.46%207.52%204.86%201.12%206.35%202.16%206.35%204.49s-2%203.77-5.09%203.77a12.34%2012.34%200%200%201%20-8.3-3.26l-2.25%202.69a15.94%2015.94%200%200%200%2010.42%203.85c5.48%200%209-2.95%209-7.51-.03-3.86-2.31-5.93-8.19-7.35zm124.11-11.08-7.69%2012-7.64-12h-4.46l10.09%2015.45v10.11h3.84v-10.23l10.16-15.33zm-64.63%203.46h8.37v22.1h3.84v-22.1h8.37v-3.46h-20.57zm38.34%2012.12c3.86-1.07%206-3.77%206-7.63%200-4.91-3.59-8-9.38-8h-11.36v25.59h3.8v-9.18h6.45l6.48%209.2h4.44l-7-9.82zm-10.95-2.5v-9.7h7.17c3.74%200%205.88%201.77%205.88%204.84s-2.29%204.86-5.84%204.86z'%20fill='%23362d59'%20transform='translate\(11%2011\)'/%3e%3c/svg%3e)![Sentry](data:image/svg+xml,%3csvg%20height='119'%20viewBox='0%200%20222%2066'%20width='400'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m29%202.26a4.67%204.67%200%200%200%20-8%200l-6.58%2011.27a32.21%2032.21%200%200%201%2017.75%2026.66h-4.62a27.68%2027.68%200%200%200%20-15.46-22.72l-6.09%2010.53a15.92%2015.92%200%200%201%209.23%2012.17h-10.61a.76.76%200%200%201%20-.62-1.11l2.94-5a10.74%2010.74%200%200%200%20-3.36-1.9l-2.91%205a4.54%204.54%200%200%200%201.69%206.24%204.66%204.66%200%200%200%202.26.6h14.53a19.4%2019.4%200%200%200%20-8-17.31l2.31-4a23.87%2023.87%200%200%201%2010.3%2021.31h12.31a35.88%2035.88%200%200%200%20-16.41-31.8l4.67-8a.77.77%200%200%201%201.05-.27c.53.29%2020.29%2034.77%2020.66%2035.17a.76.76%200%200%201%20-.68%201.13h-4.76q.09%201.91%200%203.81h4.78a4.59%204.59%200%200%200%204.62-4.61%204.49%204.49%200%200%200%20-.62-2.28zm95.32%2026.02-14.76-19.06h-3.68v25.55h3.73v-19.58l15.18%2019.58h3.26v-25.55h-3.73zm-37.17-4.74h13.23v-3.32h-13.24v-7.69h14.93v-3.32h-18.73v25.56h18.92v-3.32h-15.12zm-15.56-3.24c-5.15-1.24-6.59-2.22-6.59-4.6%200-2.14%201.89-3.59%204.71-3.59a12.06%2012.06%200%200%201%207.07%202.55l2-2.83a14.1%2014.1%200%200%200%20-9-3c-5.06%200-8.59%203-8.59%207.27%200%204.6%203%206.19%208.46%207.52%204.86%201.12%206.35%202.16%206.35%204.49s-2%203.77-5.09%203.77a12.34%2012.34%200%200%201%20-8.3-3.26l-2.25%202.69a15.94%2015.94%200%200%200%2010.42%203.85c5.48%200%209-2.95%209-7.51-.03-3.86-2.31-5.93-8.19-7.35zm124.11-11.08-7.69%2012-7.64-12h-4.46l10.09%2015.45v10.11h3.84v-10.23l10.16-15.33zm-64.63%203.46h8.37v22.1h3.84v-22.1h8.37v-3.46h-20.57zm38.34%2012.12c3.86-1.07%206-3.77%206-7.63%200-4.91-3.59-8-9.38-8h-11.36v25.59h3.8v-9.18h6.45l6.48%209.2h4.44l-7-9.82zm-10.95-2.5v-9.7h7.17c3.74%200%205.88%201.77%205.88%204.84s-2.29%204.86-5.84%204.86z'%20fill='%23fff'%20transform='translate\(11%2011\)'/%3e%3c/svg%3e)
TanStackFormV1
###### Subscribe to Bytes
Your weekly dose of JavaScript news. Delivered every Monday to over 100,000 devs, for free.
![Bytes](https://tanstack.com/_build/assets/bytes-DmvnG3ZO.svg)
Subscribe
No spam. Unsubscribe at _any_ time.
###### Subscribe to Bytes
Your weekly dose of JavaScript news. Delivered every Monday to over 100,000 devs, for free.
![Bytes](https://tanstack.com/_build/assets/bytes-DmvnG3ZO.svg)
Subscribe
No spam. Unsubscribe at _any_ time.
![scarf analytics](https://static.scarf.sh/a.png?x-pxid=b6e2134f-e805-401d-95c3-2a7765d49a3d&key=5b7j5)

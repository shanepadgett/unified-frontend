# Hosting
Hosting is the process of deploying your application to the internet so that users can access it. This is a critical part of any web development project, ensuring your application is available to the world. TanStack Start is built on Nitro, a powerful server toolkit for deploying web applications anywhere. Nitro allows TanStack Start to provide a unified API for SSR, streaming, and hydration on any hosting provider.
## What should I use?
TanStack Start is **designed to work with any hosting provider** , so if you already have a hosting provider in mind, you can deploy your application there using the full-stack APIs provided by TanStack Start.
However, since hosting is one of the most crucial aspects of your application's performance, reliability, and scalability, we highly recommend using our Official Hosting Partner Netlify.
## What is Netlify?
![Netlify logo](https://raw.githubusercontent.com/tanstack/tanstack.com/main/app/images/netlify-light.svg)
Netlify is a leading hosting platform that provides a fast, secure, and reliable environment for deploying your web applications. With Netlify, you can deploy your TanStack Start application in just a few clicks and benefit from features like a global edge network, automatic scaling, and seamless integrations with GitHub and GitLab. Netlify is designed to make your development process as smooth as possible, from local development to production deployment.
  * To learn more about Netlify, visit the Netlify website
  * To sign up, visit the Netlify dashboard


## Deployment
Warning
The page is still a work in progress. We'll keep updating this page with guides on deployment to different hosting providers soon!
When a TanStack Start application is being deployed, the server.preset value in the app.config.ts file determines the deployment target. The deployment target can be set to one of the following values:
  * netlify: Deploy to Netlify
  * vercel: Deploy to Vercel
  * cloudflare-pages: Deploy to Cloudflare Pages
  * node-server: Deploy to a Node.js server
  * bun: Deploy to a Bun server
  * ... and more to come!


Once you've chosen a deployment target, you can follow the deployment guidelines below to deploy your TanStack Start application to the hosting provider of your choice.
### Netlify
Set the server.preset value to netlify in your app.config.ts file.
ts
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
export default defineConfig({
 server: {
  preset: 'netlify',
 },
})

```
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
export default defineConfig({
 server: {
  preset: 'netlify',
 },
})

```

Or you can use the --preset flag with the build command to specify the deployment target when building the application:
sh
```
npm run build --preset netlify

```
```
npm run build --preset netlify

```

Deploy you application to Netlify using their one-click deployment process, and you're ready to go!
### Vercel
Deploying your TanStack Start application to Vercel is easy and straightforward. Just set the server.preset value to vercel in your app.config.ts file, and you're ready to deploy your application to Vercel.
ts
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
export default defineConfig({
 server: {
  preset: 'vercel',
 },
})

```
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
export default defineConfig({
 server: {
  preset: 'vercel',
 },
})

```

Or you can use the --preset flag with the build command to specify the deployment target when building the application:
sh
```
npm run build --preset vercel

```
```
npm run build --preset vercel

```

Deploy you application to Vercel using their one-click deployment process, and you're ready to go!
### Cloudflare Pages
When deploying to Cloudflare Pages, you'll need to complete a few extra steps before your users can start using your app.
  1. Installation


First you will need to install unenv
sh
```
npm install unenv

```
```
npm install unenv

```

  1. Update app.config.ts


Set the server.preset value to cloudflare-pages and the server.unenv value to the cloudflare from unenv in your app.config.ts file.
ts
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
import { cloudflare } from 'unenv'
export default defineConfig({
 server: {
  preset: 'cloudflare-pages',
  unenv: cloudflare,
 },
})

```
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
import { cloudflare } from 'unenv'
export default defineConfig({
 server: {
  preset: 'cloudflare-pages',
  unenv: cloudflare,
 },
})

```

  1. Add a wrangler.toml config file


toml
```
# wrangler.toml
name = "your-cloudflare-project-name"
pages_build_output_dir = "./dist"
compatibility_flags = ["nodejs_compat"]
compatibility_date = "2024-11-13"

```
```
# wrangler.toml
name = "your-cloudflare-project-name"
pages_build_output_dir = "./dist"
compatibility_flags = ["nodejs_compat"]
compatibility_date = "2024-11-13"

```

Deploy you application to Cloudflare Pages using their one-click deployment process, and you're ready to go!
### Node.js
Set the server.preset value to node-server in your app.config.ts file.
ts
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
export default defineConfig({
 server: {
  preset: 'node-server',
 },
})
// Or you can use the --preset flag with the build command
// to specify the deployment target when building the application:
// npm run build --preset node-server

```
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
export default defineConfig({
 server: {
  preset: 'node-server',
 },
})
// Or you can use the --preset flag with the build command
// to specify the deployment target when building the application:
// npm run build --preset node-server

```

Then you can run the following command to build and start your application:
sh
```
npm run build

```
```
npm run build

```

You're now ready to deploy your application to a Node.js server. You can start your application by running:
sh
```
node .output/server/index.mjs

```
```
node .output/server/index.mjs

```

### Bun
Important
Currently, the Bun specific deployment guidelines only work with React 19. If you are using React 18, please refer to the Node.js deployment guidelines.
Make sure that your react and react-dom packages are set to version 19.0.0 or higher in your package.json file. If not, run the following command to upgrade the packages:
sh
```
npm install react@rc react-dom@rc

```
```
npm install react@rc react-dom@rc

```

Set the server.preset value to bun in your app.config.ts file.
ts
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
export default defineConfig({
 server: {
  preset: 'bun',
 },
})
// Or you can use the --preset flag with the build command
// to specify the deployment target when building the application:
// npm run build --preset bun

```
```
// app.config.ts
import { defineConfig } from '@tanstack/react-start/config'
export default defineConfig({
 server: {
  preset: 'bun',
 },
})
// Or you can use the --preset flag with the build command
// to specify the deployment target when building the application:
// npm run build --preset bun

```

Then you can run the following command to build and start your application:
sh
```
bun run build

```
```
bun run build

```

You're now ready to deploy your application to a Bun server. You can start your application by running:
sh
```
bun run .output/server/index.mjs

```
```
bun run .output/server/index.mjs

```

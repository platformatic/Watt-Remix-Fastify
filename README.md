# Remix Fastify E-commerce Demo

This is a simple e-commerce demo using Fastify, PostgreSQL, and Remix.

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run `npm run postgresql`
4. Create a `.env` file with the following content (replace `YOUR_IP` with your IP address):

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/fastify_ecommerce
```

## Dev mode

Run `npm run dev` to start the development server.
It will start the Fastify server and the Remix development server and hot reload things as they are changed on disk

## Production mode

First run `npm run build` to build the Remix app.
Then run `npm start` to start the Fastify server and the Remix app in production mode.

## Watt-Fastify-Remix

A sample product catalog application built with Platformatic Watt, Fastify, and Remix, featuring product listings and featured product highlights.

## Features
- Product catalog browsing
- Featured products showcase
- Single API endpoint integration using [Platformatic Composer](https://platformatic.dev/composer)
- PostgreSQL database integration

## Tech Stack

* [Platformatic Watt](https://platformatic.dev/watt)
* [Fastify](https://fastify.dev/
* [Platformatic Composer](https://platformatic.dev/composer)
* Remix - React-based web framework

## Prerequisites

* Node.js v22
* PostgreSQL server (for local development)

Start PostgreSQL server:
```sh
npm run postgresql
```

Then, copy the `.env.example` file to `.env` and update the database connection string.


## Getting Started

1. Install dependencies:


```sh
npm install
cd web/remix
npm install
```

2. Start the development server:
```sh
npm run dev
```

3. Build the application:

```sh
npm run build
```

4. Start the production server:
```sh
npm run start
```

5. To see the Watt metrics, run the following command:

```sh
npx wattpm admin
```
6. Run the test script to simulate some traffic:

```sh
autocannon http://127.0.0.1:3042/products
autocannon http://127.0.0.1:3042/products/1
autocannon http://127.0.0.1:3042/products/2
autocannon http://127.0.0.1:3042/products/3
```

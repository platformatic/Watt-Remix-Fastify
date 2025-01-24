## Watt-Fastify-Remix

A sample product catalog application built with Platformatic Watt, Fastify, and Remix, featuring product listings and featured product highlights.

### Features
- Product catalog browsing
- Featured products showcase
- Single API endpoint integration using [Platformatic Composer](https://platformatic.dev/composer)
- PostgreSQL database integration

### Tech Stack

[Platformatic Watt](https://platformatic.dev/watt)
[Fastify](https://fastify.dev/
[Platformatic Composer](https://platformatic.dev/composer)
Remix - React-based web framework


### Prerequisites

Node.js
PostgreSQL server (for local development)
npm

### Installation

1. Install dependencies in root and frontend directories:

```sh
npm install
cd web/remix
npm install
```

2. Build the application:

```sh
npm run build
```


Start the development server:
```sh
npm run dev
```

### Database Setup
**Main Branch**: Works with a local PostgreSQL server
**Seed-Local Branch**: Contains `seed.js` file with sample product data

import Fastify from "fastify";
import postgres from "@fastify/postgres";
import cors from "@fastify/cors";

import Postgrator from "postgrator";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function build() {
  const fastify = Fastify({
    logger: { level: globalThis.platformatic?.logLevel ?? "info" },
  });

  await fastify.register(postgres, {
    connectionString: process.env.DATABASE_URL,
  });
    
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

const postgrator = new Postgrator({
  migrationPattern: path.join(__dirname, "./migrations/*"),
  driver: "pg",
  validateChecksums: false, 
  execQuery: async (query) => {
    const client = await fastify.pg.connect();
    try {
      const result = await client.query(query);
       return result;
    } finally {
      client.release();
    }
  },
});

try {
  const result = await postgrator.migrate();
  console.log("Migration result:", result);
} catch (error) {
  console.error("Detailed migration error:", error);
  process.exit(1);
}

  fastify.register(cors, {
    origin: true,
  });

  fastify.get("/products", async (request, reply) => {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query(
        "SELECT * FROM products ORDER BY created_at DESC"
      );
      return rows;
    } finally {
      client.release();
    }
  });

  fastify.get("/products/:id", async (request, reply) => {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query(
        "SELECT * FROM products WHERE id = $1",
        [request.params.id]
      );

      if (rows.length === 0) {
        reply.code(404).send({ error: "Product not found" });
        return;
      }

      return rows[0];
    } finally {
      client.release();
    }
  });

  fastify.post("/products", async (request, reply) => {
    const { name, description, price } = request.body;
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        "INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3) RETURNING *",
        [name, description, price, image_url]
      );
      reply.code(201).send(rows[0]);
    } finally {
      client.release();
    }
  });

  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  return fastify;
}

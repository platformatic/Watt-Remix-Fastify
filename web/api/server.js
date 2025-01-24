import Fastify from "fastify";
import cors from "@fastify/cors";
import { products } from "./seed.js";

export async function build() {
  const fastify = Fastify({
    logger: { level: globalThis.platformatic?.logLevel ?? "info" },
  });

  let productsStore = [...products];

  fastify.register(cors, {
    origin: true,
  });

  fastify.get("/products", async (request, reply) => {
    return productsStore;
  });

  fastify.get("/products/:id", async (request, reply) => {
    const product = productsStore.find(
      (p) => p.id === parseInt(request.params.id)
    );

    if (!product) {
      reply.code(404).send({ error: "Product not found" });
      return;
    }

    return product;
  });

  fastify.post("/products", async (request, reply) => {
    const { name, description, price, image_url } = request.body;

    const newProduct = {
      id:
        productsStore.length > 0
          ? Math.max(...productsStore.map((p) => p.id)) + 1
          : 1,
      name,
      description,
      price,
      image_url,
    };

    productsStore.push(newProduct);
    reply.code(201).send(newProduct);
  });

  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  return fastify;
}

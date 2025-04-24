
console.log(process.cwd())

async function run () {
  const { build } = await import('./server.js');
  const fastify = await build();
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';
  await fastify.listen({ port, host })
}

run()

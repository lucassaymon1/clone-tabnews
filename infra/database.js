import { Client } from "pg";

async function query(objectQuery) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  // objectQuery refers to the query directed to the database
  const result = await client.query(objectQuery);
  await client.end();
  return client;
}

export default {
  query: query,
};

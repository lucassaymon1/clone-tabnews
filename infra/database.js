import { Client, Pool } from "pg";

async function query(objectQuery) {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  // await client.connect();

  // objectQuery refers to the query directed to the database
  try {
    const client = await pool.connect();
    const result = await client.query(objectQuery);
    client.release();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await pool.end();
  }
}

export default {
  query: query,
};

import { Client, Pool } from "pg";

async function query(objectQuery) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  try {
    // await client.connect();
    await client.connect();
    // objectQuery refers to the query directed to the database
    const result = await client.query(objectQuery);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  } else {
    return process.env.NODE_ENV === "development" ? false : true;
  }
}

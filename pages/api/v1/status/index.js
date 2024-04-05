import database from "infra/database.js";

async function status(request, response) {
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW MAX_CONNECTIONS;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;
  // select directly the count of the number of active connections (parsing value to int)
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
        version: databaseVersionValue,
      },
    },
  });
}

export default status;

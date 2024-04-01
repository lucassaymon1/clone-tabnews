import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 5 + 9 as sum;");
  console.log(result.rows);
  response
    .status(200)
    .json({ message: "Os alunos do curso.dev são pessoas acima da média." });
}

export default status;

require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Usuário criado!", id: result.insertId });
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Usuário atualizado!" });
  });
});

app.delete("/users/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Usuário deletado!" });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

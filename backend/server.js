const express = require('express');
const cors = require('cors')
const app = express();

const pool = require('./db'); 


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let clientes =[];

app.post('/clientes', async (req,res)=> {
    const { nome, email} = req.body;

      try {
    const result = await pool.query(
      'INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const {nome, email} = req.body;
    try {
      const result = await pool.query(
        'UPDATE clientes SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
        [nome, email, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
});

app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM clientes WHERE id = $1', [id]);

    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.post('/pedidos', async (req,res)=> {
    const { produto, valor, cliente_id } = req.body;

      try {
    const result = await pool.query(
      'INSERT INTO pedidos (produto, valor, cliente_id) VALUES ($1, $2, $3) RETURNING *',
      [produto, valor, cliente_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get('/pedidos', async (req, res) => {
  try {
    const result = await pool.query('SELECT pedidos.*, clientes.nome FROM pedidos JOIN clientes ON pedidos.cliente_id = clientes.id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
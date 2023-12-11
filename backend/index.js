import cors from 'cors';
import express from 'express';
import mysql from 'mysql';

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "Samyriss123#@!",
  database: "bd1",
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('Olá, este é o backend!');
});

app.get('/login', (req, res) => {
  const q = 'SELECT * FROM usuario';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/login', (req, res) => {
  const q =
    "INSERT INTO usuario (`email`, `nome`, `senha`, `tipo_usuario`) VALUES (?)";
  const values = [
    req.body.email,
    req.body.nome,
    req.body.senha,
    req.body.tipo_usuario,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('User has been created');
  });
});

app.get('/categories', (req, res) => {
  const q = 'SELECT * FROM categoria_produto';
  db.query(q, (err, categories) => {
    if (err) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json(categories);
    }
  });
});

app.post('/products', (req, res) => {
  const { nome, preco, descricao, id_categoria } = req.body;
  const q =
    'INSERT INTO produto (`nome`, `preco`, `descricao`, `id_categoria`) VALUES (?, ?, ?, ?)';
  const values = [nome, preco, descricao, id_categoria];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ message: 'Failed to add product' });
    }
    console.log('Product added successfully!');
    return res.status(200).json({ message: 'Product added successfully' });
  });
});

app.get('/categories', (req, res) => {
  const q = 'SELECT * FROM categoria_produto';
  db.query(q, (err, categories) => {
    if (err) {
      console.error('Error fetching categories:', err); // Change "error" to "err" in this line
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json(categories);
    }
  });
});

app.get('/products', (req, res) => {
  const q = 'SELECT * FROM produto';
  db.query(q, (err, products) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.json(err);
    }
    return res.json(products);
  });
});



app.post('/add-product', (req, res) => {
  const { id_produto, nome, preco, descricao, id_categoria } = req.body;
  const q =
    'INSERT INTO produto (`id_produto`, `nome`, `preco`, `descricao`, `id_categoria`) VALUES (?, ?, ?, ?, ?)';
  const values = [id_produto, nome, preco, descricao, id_categoria];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ message: 'Failed to add product' });
    }
    console.log('Product added successfully!');
    return res.status(200).json({ message: 'Product added successfully' });
  });
});

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const q = 'SELECT * FROM produto WHERE id_produto = ?'; // Modify the SQL query to filter by product ID
  db.query(q, productId, (err, product) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product[0]);
  });
});

app.get('/avaliacao', (req, res) => {
  const q = 'SELECT * FROM avaliacao';
  db.query(q, (err, products) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.json(err);
    }
    return res.json(products);
  });
});
app.post('/avaliacao', (req, res) => {
  const q =
  'INSERT INTO avaliacao (`idCliente`, `avaliacao`) VALUES (?, ?)';
  const values = [
    req.body.idCliente,
    req.body.avaliacao
  ];
  console.log(values[0],values[1]);
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json('Rating has been created');
  });
});

app.get('/avaliacao/:id', (req, res) => {
  const productId = req.params.id;
  const q = 'SELECT * FROM avaliacao WHERE idCliente = ?'; // Modify the SQL query to filter by product ID
  db.query(q, productId, (err, product) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch rating' });
    }

    if (product.length === 0) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    return res.status(200).json(product[0]);
  });
});

app.listen(8800, () => {
  console.log('Connected to backend!');
});

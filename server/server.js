import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser'


const app = express();


app.disable('x-powered-by');
app.use(corsMiddleware());

app.use(bodyParser.json());

const port = process.env.PORT ?? 5000;

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'appentradas'
}

const connection = await mysql.createConnection(config);




app.get('/usuarios', async (req, res) => {
  const query = 'SELECT * FROM users'

  try {
    const result = await connection.query(query);
    res.json(result[0]);
  } catch (error) {
    res.status(500).send('Error al obtener los usuarios');
  }
})

app.post('/login'), async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email =?'
  const values = [email];

  try {
    const result = await connection.query(query, values);
    if(result[0] === email) {
      res.status(400).send('Logueado correctamente');
    } else {
      res.status(401).send('Usuario o contraseña incorrectos');
    }
  }
  catch (error) {
    res.status(500).send('Error al verificar el usuario');
  }
}



app.post('/register', async (req, res) => {

  const { email, password, name, username } = req.body;

  const query = 'INSERT INTO users (email, password, name, username) VALUES (?,?,?,?)';
  const values = [email, password, name, username];

  try {
    const result = await connection.query(query, values);
    res.status(201).send('Usuario creado exitosamente!');
  } catch (error) {
    res.status(500).send('Error al crear el usuario');
  }

})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


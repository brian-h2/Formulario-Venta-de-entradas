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




app.get('/', (req, res) => {
  res.status(200).send('Server is up and running!');
});


app.post('/register', (req, res) => {

  console.log(req.body)

  // const { email, password, name, username } = req.body;
  
  // //Crear consulta para agregar el usuario

  // const query = 'INSERT INTO users (email, password, name, username) VALUES (?,?,?,?)';
  // const values = [email, password, name, username];

  // try {
  //   const result = await connection.query(query, values);
  //   console.log(result);
  //   res.status(201).send('Usuario creado exitosamente!');
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Error al crear el usuario');
  // }

})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

dotenv.config();


const app = express();


app.disable('x-powered-by');
app.use(corsMiddleware());

app.use(bodyParser.json());

const port = process.env.PORT ?? 5000;

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};


const connection = await mysql.createConnection(process.env.DB_URL);


app.get('/', (req, res) => {
  res.send('API RESTful - Formulario de Registro');
})

let emailStore = null; // Inicializa emailStore como null

// Endpoint para guardar el email
app.post('/save-email', (req, res) => {
  const { email } = req.body;
  emailStore = email; // Guarda el email en la variable
  console.log(`Email guardado: ${emailStore}`);
  res.status(200).send('Email guardado con éxito');
});

// Endpoint para obtener el email
app.get('/get-email', (req, res) => {
  console.log('Email solicitado:', emailStore);
  if (emailStore) {
    res.status(200).json({ email: emailStore }); // Devolver el email guardado
  } else {
    res.status(404).json({ email: null }); // Si no hay email guardado, devolver null
  }
  
});
app.post('/', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT email, password FROM UsuariosRegister WHERE email = ?';
  const values = [email]; // Solo pasamos el email a la consulta


  try {
    const [result] = await connection.query(query, values); // Ejecutamos la consulta

      const user = result[0]; // Obtenemos el primer resultado

      // Comparar la contraseña almacenada con la ingresada
      if (user.password == password && user.email == email) { // Aquí puedes usar bcrypt.compare en producción
        res.status(200).send('Logueado correctamente'); 
      } else {
        res.status(401).send('Email o contraseña incorrectos'); // Respuesta para contraseñas incorrectas
      }
  
  } catch (error) {
    console.error('Error en la consulta:', error); // Agrega logging para errores
    res.status(500).json({ data: 'Error en el servidor' }); // Respuesta en caso de error
  }
});




app.post('/register', async (req, res) => {

  const { email, password, name, username } = req.body;

  const query = 'INSERT INTO UsuariosRegister (email, password, nombre, username) VALUES (?,?,?,?)';
  const values = [email, password, name, username];

  try {
    await connection.query(query, values);
    res.status(201).send('Usuario creado exitosamente!');
  } catch (error) {
    res.status(500).send('Error al crear el usuario');
  }

})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


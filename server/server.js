import express from 'express';
// import { corsMiddleware } from './middlewares/cors.js';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();


const app = express();


app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT ?? 5000;


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Agrega el puerto
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


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

  if (!email || !password) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = 'SELECT email, password FROM UsuariosRegister WHERE email = ?';
  const values = [email]; // Solo pasamos el email a la consulta

  try {
    const connection = await pool.getConnection(); // Obtener una conexión del pool
    const [result] = await connection.query(query, values); // Ejecutamos la consulta
    connection.release(); // Liberar la conexión al pool

    // Verifica si se encontró algún usuario
    if (result.length === 0) {
      return res.status(401).send('Email o contraseña incorrectos'); // Usuario no encontrado
    }

    const user = result[0]; // Obtenemos el primer resultado

    // Comparar la contraseña almacenada con la ingresada
    if (user.password === password) { // Aquí puedes usar bcrypt.compare en producción
      return res.status(200).send('Logueado correctamente');
    } else {
      return res.status(401).send('Email o contraseña incorrectos'); // Respuesta para contraseñas incorrectas
    }

  } catch (error) {
    console.error('Error en la consulta:', error); // Agrega logging para errores
    return res.status(500).json({ data: 'Error en el servidor' }); // Respuesta en caso de error
  }
});



app.post('/register', async (req, res) => {
  const { email, password, name, username } = req.body;

  if (!email || !password || !name || !username) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = 'INSERT INTO UsuariosRegister (email, password, nombre, username) VALUES (?,?,?,?)';
  const values = [email, password, name, username];

  try {
    const connection = await pool.getConnection(); // Obtener una conexión del pool
    await connection.query(query, values);
    connection.release(); // Liberar la conexión al pool
    res.status(201).send('Usuario creado exitosamente!');
  } catch (error) {
    console.error('Error al crear el usuario:', error); // Log del error
    // Manejo de errores específicos
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).send('El correo electrónico o nombre de usuario ya está registrado');
    }
    console.log(error); //
    res.status(500).send('Error al crear el usuario');
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


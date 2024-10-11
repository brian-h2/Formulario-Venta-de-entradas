import express from 'express';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
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


  const query = 'SELECT email, password FROM usuarios WHERE email = ?';
  const values = [email]; 

  try {
    const connection = await pool.getConnection(); // Obtener una conexión del pool
    const [result] = await connection.query(query, values); 
    connection.release(); 

    if (result.length === 0) {
      return res.status(401).send('Email o contraseña incorrectos'); 
    }

    const user = result[0]; 

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) { 
      return res.status(200).send('Logueado correctamente');
    } else {
      return res.status(401).send('Email o contraseña incorrectos');
    }

  } catch (error) {
    console.error('Error en la consulta:', error); 
    return res.status(500).json({ data: 'Error en el servidor' }); 
  }
});



app.post('/register', async (req, res) => {
  const { email, password, name, username } = req.body;

  if (!email || !password || !name || !username) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const hashedPassword = await bcrypt.hash(password,10);

  const userId = uuidv4();

  const query = 'INSERT INTO usuarios (id,nombre, usuario, email, password) VALUES (?,?,?,?,?)';
  const values = [userId, name, username, email, hashedPassword];

  try {

    const connection = await pool.getConnection(); 
    await connection.query(query, values);
    connection.release(); 
    res.status(201).send('Usuario creado exitosamente!');

  } catch (error) {
    console.error('Error al crear el usuario:', error); 
    
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


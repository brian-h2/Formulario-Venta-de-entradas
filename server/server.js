import express from 'express';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import {authenticateJWT} from './middlewares/authenticate.js';
import fetch from 'node-fetch';

dotenv.config();

const app = express();

app.disable('x-powered-by');

const corsOptions = {
  origin: '*',  // Permitir solicitudes desde Vercel
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const port = process.env.PORT ?? 5000;

const jwt_secret = process.env.JWT_SECRET;


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



let valueToken = null;

app.post('/save-date', (req,res) => {
  const { token } = req.body
  valueToken = token;
  res.status(200).send('Token asignado exitosamente')
});


app.get('/proxy/get-user', async (req, res) => {

  if (!valueToken) {
    return res.status(400).send('Token requerido');
}

try {
    // Hacer la solicitud al endpoint de get-email
    const response = await fetch('https://formulario-venta-de-entradas-production.up.railway.app/get-email', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${valueToken}`,
    }
    });
   
    if(!response.ok) {
      throw new Error('Error en la solicitud a get-email');
    }

    const userData = await response.json();

    res.status(200).json(userData);

} catch (error) {
    console.error('Error en la solicitud a get-email:', error);
    return res.status(500).json({ error: 'Error en el servidor al obtener el email' });
}
});



app.get('/get-email', authenticateJWT, async (req, res) => {

  const token = req.headers['authorization'].split(' ')[1];

  if(!token) return res.status(403).send('Token Requerido');

  const query = 'SELECT nombre, usuario, email, telefono FROM usuarios WHERE email = ?';

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(query, [req.user.email]);  
    connection.release();

    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = result[0];

    res.status(200).json({
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
    });
  } catch (error) {
    console.error('Error en la consulta:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});



app.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Todos los campos son obligatorios');
  }


  const query = 'SELECT id, email, password, nombre  FROM usuarios WHERE email = ?';
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
      const token = jwt.sign({id: user.id, email: user.email }, jwt_secret, { expiresIn: '1h' });
      
      res.status(200).json({ message: 'Login exitoso', token });
    } else {
      return res.status(401).send('Email o contraseña incorrectos');
    }

  } catch (error) {
    console.error('Error en la consulta:', error); 
    return res.status(500).json({ data: 'Error en el servidor' }); 
  }
});



app.post('/register', async (req, res) => {
  const { email, password, name, username,telephone } = req.body;

  if (!email || !password || !name || !username || !telephone) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const hashedPassword = await bcrypt.hash(password,10);

  const userId = uuidv4();

  const query = 'INSERT INTO usuarios (id,nombre, usuario, email, password, telefono) VALUES (?,?,?,?,?,?)';
  const values = [userId, name, username, email, hashedPassword,telephone];

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


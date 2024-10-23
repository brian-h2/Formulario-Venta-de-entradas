import express from 'express';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import {authenticateJWT} from './middlewares/authenticate.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(helmet({
  frameguard: false,  // Esto deshabilita el encabezado X-Frame-Options
}));

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://sites.google.com");
  next();
});

app.disable('x-powered-by');
app.use(cors({
  origin: (origin, callback) => {
    const acceptedOrigins = [
      "http://localhost:5173", // Cambia este puerto si es necesario
      "http://127.0.0.1:5173",
      "http://localhost:5000",
      "https://formulario-venta-de-entradas.vercel.app",
      "https://formulario-venta-de-entradas.vercel.app/",
      "https://845863178-atari-embeds.googleusercontent.com/",
      "https://sites.google.com",
    ];

    if (acceptedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('El origen no está permitido.'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] ,
  credentials: true,
}));
app.use(cookieParser());
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


let emailStore = null;

app.post('/save-email', (req, res) => {
  const { email, token} = req.body;
  if (!email && !token) {
    return res.status(400).json({ error: 'Email y token son requeridos.' });
  }

  emailStore = { email: email, token: token}; // Guarda el email en la variable
  console.log(`Email guardado: ${emailStore.email, emailStore.token}`);
  res.status(200).json({ message: 'Email guardado con éxito', emailStore }); // Cambia send por json
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
      
      res.cookie('access_token', token, { 
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // Expira en 1 hora
        secure: process.env.NODE_ENV === 'production', // Si estás usando HTTPS (en producción)
        SameSite: 'None', 
      })
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


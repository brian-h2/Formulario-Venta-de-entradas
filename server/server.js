import express from 'express';
import { corsMiddleware} from './middlewares/cors.js'
import bodyParser from 'body-parser'

const app = express();
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(corsMiddleware());
const port = process.env.PORT ?? 5000;

app.get('/', (req, res) => {
    res.status(200).json(req.body);
})

app.post('/', (req, res) => {
   console.log(req.body)
    
    res.status(200).json('Recibido');
})





app.listen(port , () => {
    console.log(`Server running on port ${port}`);
})
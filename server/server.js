import express from 'express';
import { corsMiddleware} from './middlewares/cors.js'

const app = express();
app.disable('x-powered-by');
app.use(corsMiddleware());
const port = process.env.PORT ?? 5000;

app.get('/', (req, res) => {
    console.log('Hola mundo')
})


app.listen(port , () => {
    console.log(`Server running on port ${port}`);
})
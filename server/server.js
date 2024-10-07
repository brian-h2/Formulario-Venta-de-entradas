import express from 'express';

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT ?? 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.listen(port , () => {
    console.log(`Server running on port ${port}`);
})
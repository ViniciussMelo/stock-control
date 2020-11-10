import express from 'express';

const app = express();
app.use(express.json());

console.log('Back-end started! 🚀');

app.listen(3333);
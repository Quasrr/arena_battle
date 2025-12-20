import express from 'express';
import cors from 'cors';
import router from './src/routes.js';

const app = express();
const port = process.env.PORT || 3000;

// CORS Policy
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.static('public'));

app.use(router);

app.listen(port, () => {
    console.log('Serveur démarré.');
});
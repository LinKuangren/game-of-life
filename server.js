const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', '*']
  }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const wikiRouter = require('./routes/wiki');
app.use('/wiki', wikiRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
    console.log(`Serveur démarré sur http://${hostname}:${port}`);
});

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
var wikiRouter = require('./routes/wiki.js');

// Routes
app.use('/wiki', wikiRouter);


// Server config
let hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
    console.log(`Serveur démarré sur http://${hostname}:${port}`);
});

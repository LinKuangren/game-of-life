const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/login', (req, res) => {
  const { name, password } = req.body;

  const userFilePath = path.join(__dirname, '../prisma/user_admin.json');
  fs.readFile(userFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }

    const adminUser = JSON.parse(data);

    if (adminUser.name === name && adminUser.password === password) {
      res.json({ message: 'Connexion réussie' });
    } else {
      res.status(401).json({ error: 'Accès refusé' });
    }
  });
});

module.exports = router;

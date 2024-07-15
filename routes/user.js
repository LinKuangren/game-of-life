const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = "xxxxx.yyyyy.zzzzz";

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
      const token = jwt.sign(
        { userId: adminUser.name },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token, user: adminUser.name });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  });
});

/**
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
      res.json({ user: adminUser.name });
    } else {
      res.status(401).json({ message: 'You should not pass !' });
    }
  });
});
*/

module.exports = router;

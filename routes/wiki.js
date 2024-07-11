const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const configurations = await prisma.configuration.findMany();
        res.json(configurations);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des configurations' });
    }
});

router.post('/upload', upload.single('file'), (req, res) => {
    console.log('Fichier reçu:', req.file);
    if (req.file) {
        res.json({ filePath: req.file.filename });
    } else {
        res.status(400).json({ error: 'Erreur lors de l\'upload du fichier' });
    }
});

router.post('/new-configuration', async (req, res) => {
    try {
        console.log('Données reçues:', req.body);
        const { name, illustration, type, boundingBox, nbCellules, periode, speed } = req.body;
        const configuration = await prisma.configuration.create({
            data: { name, illustration, type, boundingBox, nbCellules: Number(nbCellules), periode: Number(periode), speed },
        });
        res.status(200).json(configuration);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de la configuration' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const configuration = await prisma.configuration.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!configuration) {
            return res.status(404).json({ error: 'Configuration non trouvée' });
        }

        const imagePath = path.join(__dirname, 'uploads', configuration.illustration);
        try {
            fs.unlinkSync(imagePath);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error('Erreur lors de la suppression de l\'image:', err);
                return res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
            }
        }

        await prisma.configuration.delete({
            where: { id: parseInt(req.params.id) }
        });

        res.status(200).json({ message: 'La configuration a été supprimée.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la configuration' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const configuration = await prisma.configuration.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (configuration) {
            res.json(configuration);
        } else {
            res.status(404).json({ error: 'Configuration non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la configuration' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedConfiguration = await prisma.configuration.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.json(updatedConfiguration);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la configuration' });
    }
});

module.exports = router;

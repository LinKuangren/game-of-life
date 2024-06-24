const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const configurations = await prisma.configuration.findMany();
        res.json(configurations);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des configurations' });
    }
});

router.post('/new-configuration', async (req, res) => {
    try {
        const { name, illustration, type, boundingBox, nbCellules, periode, speed } = req.body;
        const configuration = await prisma.configuration.create({
            data: { name, illustration, type, boundingBox, nbCellules, periode, speed },
        });
        res.status(200).json(configuration);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de la configuration' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
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

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/', async function(req, res, next) {
    const configuration = await prisma.Configuration.findMany()
    res.send(configuration);
});

router.post('/new-configuration', async function(req, res) {
    
})

router.delete('/:id', async function(req, res) {
    const configuration = await prisma.configuration.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });

    res.status(200).json({ message: `La configuration est supprimé.` });
});

router.get('/:id', async function(req, res){
    
});
 
router.put("/:id", async function (req, res) {
    
});

module.exports = router;
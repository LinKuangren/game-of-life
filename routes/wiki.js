const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/', async function(req, res, next) {
    const configuration = await prisma.Configuration.findMany()
    res.send(configuration);
});

module.exports = router;
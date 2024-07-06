const express = require('express');
const { createClient, getClient, getClients, updateClient, deleteClient } = require('../controllers/clientControllers');

const router = express.Router();

router.post('/', createClient);

router.get('/:clientId', getClient);

router.get('/', getClients);

router.put('/:clientId', updateClient);

router.delete('/:clientId', deleteClient);

module.exports = router;
require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./config/db');
const logger = require('./utils/logger');
const clientRoutes = require('./api/routes/clientRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '20mb' }));

app.use('/api/v1/client', clientRoutes);

const PORT = process.env.PORT || 6003;

app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
});
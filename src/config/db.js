const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        logger.info("Database conntected");
    })
    .catch( (error) => {
        logger.error(error);
    })
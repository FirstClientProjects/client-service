const logger = require('../../utils/logger');
const ClientSchema = require('../models/Client');
const SuccessResponse = require('../../utils/SuccessResponse');
const ErrorResponse = require('../../utils/ErrorResponse');

const createClient = async (req, res) => {
    try {
        const { fname, lname, image, mobile, email } = req.body;
        const client = new ClientSchema({ fname, lname, image, mobile, email });
        const savedClient = await client.save();
        logger.info('Create client query was successful');
        res.status(201).json(
            new SuccessResponse(
                201,
                "Create client query was successful",
                savedClient
            )
        );
    } catch (error) {
        logger.error('Create client internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Create client internal server error",
                error.message
            )
        );
    }
}

const getClient = async (req, res) => {
    try {
        if(!req.params.clientId) {
            return res.status(422).json(
                new ErrorResponse(
                    422,
                    "Get client query was failed",
                    "Client Id not found. Missing from the request."
                )
            );
        }
        const { clientId } = req.params;
        const client = await ClientSchema.findById(clientId).select('-password');
        if(!client) {
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Get client query was failed",
                    "Client not found. Doesn't have this Id."
                )
            );
        }
        logger.info('Get client query was successful');
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get client query was successful",
                client
            )
        );
    } catch (error) {
        logger.error('Get client internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get client internal server error",
                error.message
            )
        );
    }
}

const getClients = async (req, res) => {
    try {
        const clients = await ClientSchema.find().select('-password');
        logger.info('Get clients query was successful');
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get clients query was successful",
                clients
            )
        );
    } catch (error) {
        logger.error('Get client internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get client internal server error",
                error.message
            )
        );
    }
}

const deleteClient = async (req, res) => {
    try {
        if(!req.params.clientId) {
            return res.status(422).json(
                new ErrorResponse(
                    422,
                    "Get client query was failed",
                    "Client Id not found. Missing from the request."
                )
            );
        }
        const { clientId } = req.params;
        const client = await ClientSchema.findById(req.params.clientId);
        if(!client) {
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Delete client query was failed",
                    "Client not found. Doesn't have this Id."
                )
            );
        }
        await ClientSchema.findByIdAndDelete(clientId);
        logger.info('Delete client query was successful');
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete client query was successful",
                "Client deleted successfully"
            )
        );
    } catch (error) {
        logger.error('Delete client internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete client internal server error",
                error.message
            )
        );
    }
}

const updateClient = async(req, res) => {
    try {
        if(!req.params.clientId) {
            return res.status(422).json(
                new ErrorResponse(
                    422,
                    "Get client query was failed",
                    "Client Id not found. Missing from the request."
                )
            );
        }
        const { clientId } = req.params;
        const { fname, lname, image, mobile, email } = req.body;
        const updatedClient = await ClientSchema.findByIdAndUpdate(
            clientId,
            { $set: { fname, lname, image, mobile, email } },
            { new: true }
        ).select('-password');
        if(!updatedClient) {
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Update client query was failed",
                    "Client not found. Doesn't have this Id."
                )
            );
        }
        logger.info('Update client query was successful');
        res.status(201).json(
            new SuccessResponse(
                201,
                "Update client query was successful",
                updatedClient
            )
        );
    } catch (error) {
        logger.error('Update client internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Update client internal server error",
                error.message
            )
        );
    }
}

module.exports = {
    createClient,
    getClient,
    getClients,
    deleteClient,
    updateClient
};
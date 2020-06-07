import express, { response, request } from 'express';
import Knex from './database/connection';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();


//routes.post('/points',pointsController.Create); antes do upload de fotos

    routes.get('/points', pointsController.index);
    routes.get('/points/:id', pointsController.show);
    routes.get('/items', itemsController.index);

    routes.post(
            '/points', 
            upload.single('image'), 
            celebrate ({
                body: Joi.object().keys({
                    name: Joi.string().required(),
                    email: Joi.string().required().email(),
                    whatsapp: Joi.number().required(),
                    latitude: Joi.number().required(),
                    longitude: Joi.number().required(),
                    city: Joi.string().required(),
                    uf: Joi.string().required().max(2),
                    items: Joi.string().required(),
                })
            }), 
            pointsController.Create);

    routes.get('/items2', async (request, response) => {
    
        const items = await Knex('items').select('*');

        return response.json(items);
    });

export default routes;

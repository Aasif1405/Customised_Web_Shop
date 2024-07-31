import { response } from 'express';
import Animal from '../../models/Animal.js';

const rules = checkSchema({
    page: {
        isNumeric: true,
        errormessage: `"page" must be a Number!`
    },
    perPage:{
        isNumeric: true,
        errormessage: `"page" must be a Number!`

    }
}, [query]);

const handle = async (request, reponse, next) => {
    try{

        const { page = 1, perPage = 5 } = request.query;

        const count = await Animal.countDocuments();
        const pages = Math.ceil(count / perPage);

        const pagination = {
            page: parseInt(page),
            perPage: parseInt(perPage),
            count,
            pages


        }

        const where = {};
        const fields = {};
        const opts = {
            skip: (page-1)* perPage,
            limit: perPage,
            sort: {
                createdAt: -1
            }
        };

        const records = await Animal.find(where, fields, opts);
        response.json({ pagination, records });


    } catch (error) {
        console.log(error);
        next(error);

    }
};

export default { handle };
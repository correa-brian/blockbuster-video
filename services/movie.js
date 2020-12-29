'use strict';
import { getMovie, getMovies } from '../handlers/movie.js';

const schema = {
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' }
            }
        }
    }
}

export const movieServices = [{
        method: 'GET',
        url: '/movies',
        handler: getMovies
    },
    {
        method: 'GET',
        url: '/movies/movie/:id',
        handler: getMovie,
        schema: schema
    }
];
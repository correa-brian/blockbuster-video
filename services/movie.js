'use strict';
import { getMovie, getMovies } from '../handlers/movie.js';

const getMovieValidation = {
    params: {
        id: { type: 'string' } 
    },
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

export const movieRoutes = [{
        method: 'GET',
        url: '/movies',
        handler: getMovies
    },
    {
        method: 'GET',
        url: '/movies/movie/:id',
        handler: getMovie,
        schema: getMovieValidation
    }
];
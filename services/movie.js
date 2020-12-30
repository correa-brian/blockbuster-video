'use strict'
import { getMovie, getMovies } from '../handlers/movie.js'

/**
 * Serialization schema for responses.
 */
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

/**
 * Available routes for accessing movies.
 */
export const movieService = [
  {
    method: 'GET',
    url: '/movies',
    handler: getMovies,
    schema: schema
  },
  {
    method: 'GET',
    url: '/movies/movie/:id',
    handler: getMovie,
    schema: schema
  }
]

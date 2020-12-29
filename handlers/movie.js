'use strict';

/**
 * Local list of movies
 */
let movies = [
    {
        id: 1,
        title: 'Matrix'
    },
    {
        id: 2,
        title: 'Deadpool'
    },
    {
        id: 3,
        title: 'Die Hard'
    }
];

/**
 * Returns all the movies available in the local DB.
 * 
 * @param { Request } req 
 * @param { Object } reply 
 */
export const getMovies = async(req, reply) => {
    return reply.send({ success: true, result: movies});
}

/**
 * Returns a movie by id.
 * 
 * @param { Request } req 
 * @param { Object} reply 
 */
export const getMovie = async(req, reply) => {
    const id = Number(req.params.id);
    
    const movie = movies.find(movie => movie.id === id);
    if (movie === undefined) {
      return reply.send({ success: true, message: "no movie found" })
    }

    return reply.send({ id: id, title: movie.title });
}

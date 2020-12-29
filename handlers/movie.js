'use strict';

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

export const getMovies = async(req, reply) => {
    return reply.send({ success: true, result: movies});
}

export const getMovie = async(req, reply) => {
    const id = Number(req.params.id);
    
    const movie = movies.find(movie => movie.id === id);
    if (movie === undefined) {
      return reply.send({ success: true, message: "no movie found" })
    }

    return reply.send({ id: id, title: movie.title });
}

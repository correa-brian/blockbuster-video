'use strict'

import fastify from 'fastify'
import { route } from './services/route.js.js'
import { movieRoutes } from './services/movie.js'
import mongoConnector from './plugins/mongo-connector.js'

const app = fastify({
  logger: true
})

// order matters: https://github.com/fastify/fastify/blob/master/docs/Getting-Started.md#loading-order-of-your-plugins
// connect to DB
app.register(mongoConnector)
movieRoutes.forEach((route, index) => {
  app.route(route)
})

app.get('/', async (req, reply) => {
  reply.send({ hello: "try this" });
})

// hooks
app.addHook('onRoute', (routeOptions) => {
  console.log("route options", routeOptions);
})

app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})

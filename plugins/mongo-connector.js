'use strict'

import fastifyPlugin from 'fastify-plugin'
import fastifyMongodb from 'fastify-mongodb'

export default fastifyPlugin(async function (fastify, opts) {
  fastify.register(fastifyMongodb, {
    url: 'mongodb://localhost:27017/test_database'
  })
})

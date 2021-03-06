'use strict'

import fastify from 'fastify'
import { movieService } from './services/movie.js'
import { videoService } from './services/video.js'
import mongoConnector from './plugins/mongo-connector.js'
import path from 'path'
import fastifyStatic from 'fastify-static'

const app = fastify({
  logger: true
})

// order matters: https://github.com/fastify/fastify/blob/master/docs/Getting-Started.md#loading-order-of-your-plugins
// 3P plugins, custom plugins, decorators, hooks, services
app.register(fastifyStatic, {
  root: path.resolve(path.dirname(''))
})

// connect to DB
app.register(mongoConnector)

// movie service contains movie-related routes
movieService.forEach((route, index) => {
  app.route(route)
})

videoService.forEach((route, index) => {
  app.route(route)
})

// serialization schema
const outputSchema = {
  schema: {
    response: {
      '2xx': {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}

// validation schema for header and body
const validationOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        'name': { type: 'string' },
        'age': { type: 'integer' }
      }
    },
    headers: {
      type: 'object',
      properties: {
        'secret-pw': { type: 'string' }
      },
      required: ['secret-pw']
    }
  }
}

// validation schema for querystring params
const queryStringOpts = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        id: { type: 'integer' }
      },
      required: ['name', 'id']
    }
  }
}

// validation schema for params (i.e. example.com/movie/:id)
const paramsOpts = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      },
      required: ['id']
    }
  }
}

app.setSerializerCompiler(({ schema, method, url, httpStatus }) => {
  return data => JSON.stringify(data)
})

// test output/serialiation schema
app.get('/', outputSchema, (req, reply) => {
  reply.header('Content-Type', 'application/json').code(200)
  return reply.send({ hello: 'world' })
})

app.get('/demo', async (req, reply) => {
  await reply
    .header('Content-Type', 'text/html')
    .code(200)
    .type('text/html')
    .sendFile('./public/index.html')
})

// test query string schema
app.get('/question', queryStringOpts, (req, reply) => {
  return reply
    .header('Content-Type', 'application/json')
    .code(200)
    .send({ hello: 'town' })
})

// test params schema
app.get('/faq/:id', paramsOpts, (req, reply) => {
  reply.header('Content-Type', 'application/json').code(200)
  return reply.send({ hello: 'village' })
})

// test request validation schema (body/headers)
app.post('/info', validationOpts, (req, reply) => {
  reply.header('Content-Type', 'application/json').code(200)
  return reply.send({ hello: 'info' })
})

// hooks
app.addHook('onRoute', (routeOptions) => {
  console.log('route options', routeOptions)
})

// start the server
app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})

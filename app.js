'use strict'

import fastify from 'fastify'
import { movieServices } from './services/movie.js'
import mongoConnector from './plugins/mongo-connector.js'

const app = fastify({
  logger: true
})

// order matters: https://github.com/fastify/fastify/blob/master/docs/Getting-Started.md#loading-order-of-your-plugins
// connect to DB
app.register(mongoConnector)
movieServices.forEach((route, index) => {
  app.route(route)
})

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

const validationOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        'name': { type: 'string'},
        'age': { type: 'integer'} 
      }
    },
    headers: {
      type: 'object',
      properties: {
          'secret-pw': {type: 'string'}
      },
      required: ['secret-pw']
    }
  }
}

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
app.get('/', outputSchema, async (req, reply) => {
  reply.header('Content-Type', 'application/json').code(200)
  reply.send({ hello: 'world' });
})

// test query string schema
app.get('/question', queryStringOpts, async (req, reply) => {
  reply.header('Content-Type', 'application/json').code(200)
  reply.send({ hello: 'town' });  
})

// test params schema
app.get('/faq/:id', paramsOpts, async (req, reply) => {
  reply.header('Content-Type', 'application/json').code(200)
  reply.send({ hello: 'village' });  
})

// test request validation schema (body/headers)
app.post('/info', validationOpts, async (req, reply) => {
  reply.header('Content-Type', 'application/json').code(200)
  reply.send({ hello: 'info' });
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


const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerDefinition = {

  openapi: '3.0.0',
  info: {
    title: 'REST API Docs',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      login: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            example: 'kenny1@pragma.com'
          },
          password: {
            type: 'string',
            example: 'kennyluquegaaa'
          }
        }
      },
      usermaster: {
        type: 'object',
        required: ['name', 'lastName', 'identifier', 'phone', 'email', 'password', 'roleId'],
        properties: {
          name: {
            type: 'string',
            example: 'kenny'
          },
          lastName: {
            type: 'string',
            example: 'luque'
          },
          identifier: {
            type: 'integer($int64)',
            example: '7123124529'
          },
          phone: {
            type: 'string',
            example: '+23423456'
          },
          email: {
            type: 'string',
            example: 'ke4nny1234@pragma.com.co'
          },
          password: {
            type: 'string',
            example: 'kennyluquegaaa'
          },
          roleId: {
            type: 'integer($int64)',
            example: '1'
          }
        }
      },
      user: {
        type: 'object',
        required: ['name', 'lastName', 'identifier', 'phone', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            example: 'kenny'
          },
          lastName: {
            type: 'string',
            example: 'luque'
          },
          identifier: {
            type: 'integer($int64)',
            example: '72112234529'
          },
          phone: {
            type: 'string',
            example: '+234234456'
          },
          email: {
            type: 'string',
            example: 'ke4nny19374@pragma.com.co'
          },
          password: {
            type: 'string',
            example: 'kennyluquegaaa'
          }
        },
        dish: {
          type: 'object',
          required: ['name', 'description', 'price', 'urlImage', 'categoryId', 'restaurantId'],
          properties: {
            name: {
              type: 'string',
              example: 'Papa Rellena'
            }
          }
        }
      }
    }
  }
}

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs (app, port) {
  // Swagger page
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Docs in JSON format
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(
    `INFO:     Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  )
}

module.exports = { swaggerDocs }
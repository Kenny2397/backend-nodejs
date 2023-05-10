const request = require('supertest')
const { loginTest } = require('./utils')

const app = require('../app')

describe('POST /api/v1/dishes', () => {
  it('validate login', async function () {
    const response = await request(app)
      .post('/api/v1/dishes')
      .send()
    expect(response.status).toEqual(401)
  })

  it('validate required fields', async function () {
    const token = await loginTest(app, 'owner')

    const response = await request(app)
      .post('/api/v1/dishes')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.status).toEqual(400)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body.error).toEqual('Bad Request')
    expect(response.body.message).toEqual('"name" is required. "description" is required. "price" is required. "urlImage" is required. "categoryId" is required. "restaurantId" is required')
  })

  it('POST /api/v1/dishes Responds with status code 200 to create a new dish, being user owner', async function () {
    const response = await request(app)
      .post('/api/v1/dishes')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY4MzcyNDUxOH0.2Bl2LjBBU4gsXAncUYlr-dOeG1C8UOf0pELCfNIanjI')
      .send({
        name: 'lomo saltado',
        description: 'El lomo saltdo es un plato tipico de Perú',
        price: 50,
        urlImage: 'https://lomo.png',
        categoryId: 1,
        restaurantId: 1
      })
    expect(response.status).toEqual(200)
    expect(response.headers['content-type']).toMatch(/json/)
  })

  /**
   * UPDATE
   */
  it('PATCH /api/v1/dishes/1 validate required fields', async function () {
    const response = await request(app)
      .patch('/api/v1/dishes/1')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY4MzcyNDUxOH0.2Bl2LjBBU4gsXAncUYlr-dOeG1C8UOf0pELCfNIanjI')
      .send()
    expect(response.status).toEqual(400)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body.error).toEqual('Bad Request')
    expect(response.body.message).toEqual('"description" is required. "price" is required')
  })

  it('PATCH /api/v1/dishes/:id Responds with status code 200 to update price and description, being user owner', async function () {
    const dishId = 1
    console.log(`-------------/api/v1/dishes/:${dishId}`)
    const response = await request(app)
      .patch(`/api/v1/dishes/${dishId}`)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY4MzcyNDUxOH0.2Bl2LjBBU4gsXAncUYlr-dOeG1C8UOf0pELCfNIanjI')
      .send({
        description: 'El lomo saltdo es un plato tipico de Perú',
        price: 50
      })
    expect(response.status).toEqual(200)
    expect(response.headers['content-type']).toMatch(/json/)
  })
})

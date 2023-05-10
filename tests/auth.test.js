const request = require('supertest')

const app = require('../app')

describe('Auth Endpoint  ', () => {
  it('POST /api/v1/auth validate required fields', async function () {
    const response = await request(app)
      .post('/api/v1/dishes')
      .send()
    expect(response.status).toEqual(400)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body.error).toEqual('Bad Request')
    // expect(response.body.message).toEqual('"name" is required. "description" is required. "price" is required. "urlImage" is required. "categoryId" is required. "restaurantId" is required')
  })
})

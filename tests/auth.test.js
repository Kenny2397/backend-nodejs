const request = require('supertest')

const app = require('../app')

describe('POST /api/v1/auth Auth Endpoint  ', () => {
  it('POST /api/v1/auth validate required fields', async function () {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send()
    expect(response.status).toEqual(400)
  })

  it('POST /api/v1/auth validate required fields login status 401 expected to incorrect credentials', async function () {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'kenny1@pragma.com',
        password: 'kennyluque123'
      })
    expect(response.status).toEqual(401)
  })

  it('POST /api/v1/auth validate required fields login status 200 expected to correct credentials', async function () {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'kenny1@pragma.com',
        password: 'kennyluquegaaa'
      })
    expect(response.status).toEqual(200)
  })
})

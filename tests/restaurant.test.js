const request = require('supertest')
const app = require('../app')
const { loginTest } = require('./utils')

/**
 * CREATE RESTAURANT
 */
describe('POST /api/v1/restaurants create a restaurant by admin user', () => {
  const randomNum = Math.floor(Math.random() * 90000) + 10000

  const nitRandom = randomNum

  it('validate auth', async function () {
    const response = await request(app)
      .post('/api/v1/restaurants')
      .send()
    expect(response.status).toEqual(401)
  })

  it('validate required fields', async function () {
    const token = await loginTest(app, 'admin')
    const response = await request(app)
      .post('/api/v1/restaurants')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.status).toEqual(400)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body.error).toEqual('Bad Request')
    expect(response.body.message).toEqual('"name" is required. "address" is required. "phone" is required. "urlLogo" is required. "nit" is required. "ownerId" is required')
  })

  it('responds with status code 200 to create a new restaurant with role Admin', async function () {
    const token = await loginTest(app, 'admin')
    const response = await request(app)
      .post('/api/v1/restaurants')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'tanta2',
        address: 'jiron ica 123 lince',
        phone: '712344529',
        urlLogo: 'https://random.io',
        nit: nitRandom,
        ownerId: '2'
      })
    expect(response.status).toEqual(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body.response.nit).toEqual(nitRandom)
  })
})

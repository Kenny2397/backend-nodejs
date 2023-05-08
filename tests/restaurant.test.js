const request = require('supertest')

const app = require('../app')

describe('POST /api/v1/restaurants', () => {
  const randomNum = Math.floor(Math.random() * 90000) + 10000

  const nitRandom = randomNum

  it('POST /api/v1/restaurants validate required fields', async function () {
    const response = await request(app)
      .post('/api/v1/restaurants')
      .send()
    expect(response.status).toEqual(400)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body.error).toEqual('Bad Request')
    expect(response.body.message).toEqual('"name" is required. "address" is required. "phone" is required. "urlLogo" is required. "nit" is required. "ownerId" is required')
  })

  it('responds with status code 200 to create a new restaurant with role Admin', async function () {
    const response = await request(app)
      .post('/api/v1/restaurants')
      .send({
        name: 'tanta2',
        address: 'jiron ica 123 lince',
        phone: '712344529',
        urlLogo: 'https://random.io',
        nit: nitRandom,
        ownerId: '1'
      })
    expect(response.status).toEqual(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body.response.nit).toEqual(nitRandom)
  })
})

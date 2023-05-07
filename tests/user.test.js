const request = require('supertest')

const app = require('../app')

describe('GET /', () => {
  it('responds with status code 200', function (done) {
    request(app)
      .get('/home')
      .expect(200, done)
  })
})

describe('POST /', () => {
  const randomNum = Math.floor(Math.random() * 9000) + 1000

  const emailRandom = `kenny${randomNum}@pragma.com`

  it('responds with status code 200 to create a new user with role Admin', async function () {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'kenny',
        lastName: 'luque',
        identifier: '712344529',
        phone: '+23423456',
        email: emailRandom,
        password: 'kennyluquegaaa',
        roleId: '1'
      })

    expect(response.status).toEqual(200)
  })
})

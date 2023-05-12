const request = require('supertest')
const app = require('../../app')

describe('GET /', () => {
  it('responds with status code 200', function (done) {
    request(app)
      .get('/home')
      .expect(200, done)
  })
})

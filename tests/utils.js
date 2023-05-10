const request = require('supertest')

async function loginTest (app, role) {
  const emailRole = {
    admin: 'kenny1@pragma.com',
    owner: 'kenny2@pragma.com',
    employee: 'kenny3@pragma.com'
  }

  const login = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: emailRole[role],
      password: 'kennyluquegaaa'
    })

  return login.body.token
}

function IdentifierEmailRandomValue () {
  const randomNum = Math.floor(Math.random() * 9000) + 1000

  const identifierRandom = `456${randomNum}324`
  const emailRandom = `kenny${randomNum}@pragma.com`

  return {
    identifierRandom,
    emailRandom
  }
}

module.exports = {
  loginTest,
  IdentifierEmailRandomValue
}

const bcrypt = require('bcrypt')

const password = 'admin123'

async function hashPassword (password) {
  // const passwordHashed = ''
  const hash = await bcrypt.hash(password, 10)
  console.log(hash)
}

hashPassword(password)

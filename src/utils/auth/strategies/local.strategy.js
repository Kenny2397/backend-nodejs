const { Strategy } = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('./../../../libs/sequelize')

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (userEmail, userPassword, done) => {
    try {
      const user = await models.User.findOne({
        where: {
          email: userEmail
        }
      })
      if (!user) {
        done(boom.unauthorized(), false)
      }
      const isMatch = await bcrypt.compare(userPassword, user.password)

      if (!isMatch) {
        done(boom.unauthorized(), false)
      }

      delete user.dataValues.password
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  })

module.exports = LocalStrategy

const boom = require('@hapi/boom')

const { config } = require('./../config/config')
// const models = require('./../libs/sequelize')

function checkApiKey (req, res, next) {
  const apiKey = req.headers.api
  if (apiKey === config.apiKey) {
    next()
  } else {
    next(boom.unauthorized())
  }
}

function checkRoles (...roles) {
  return (req, res, next) => {
    try {
      const useri = req.user
      if (roles.includes(useri.roleId)) {
        next()
      } else {
        throw boom.forbidden('The user does not have access to this route')
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { checkApiKey, checkRoles }

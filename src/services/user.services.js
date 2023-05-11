const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('../libs/sequelize')

class UserService {
  // eslint-disable-next-line no-useless-constructor
  constructor () { }

  async create (data) {
    const userEmail = data.email

    const userAlredyExist = await models.User.findOne({
      where: { email: userEmail }
    })

    if (userAlredyExist !== null) {
      throw boom.conflict('User with email is already exist!')
    }

    const hashPassword = await bcrypt.hash(data.password, 10)

    const newUser = await models.User.create({
      ...data,
      password: hashPassword
    })

    delete newUser.dataValues.password
    return newUser
  }

  async createOwner (data) {
    const userEmail = data.email

    const userAlredyExist = await models.User.findOne({
      where: { email: userEmail }
    })

    if (userAlredyExist !== null) {
      throw boom.conflict('User with email is already exist!')
    }

    const hashPassword = await bcrypt.hash(data.password, 10)

    const newUser = await models.User.create({
      ...data,
      roleId: 2,
      password: hashPassword
    })

    delete newUser.dataValues.password
    return newUser
  }

  async createEmployee (data) {
    const userEmail = data.email

    const userAlredyExist = await models.User.findOne({
      where: { email: userEmail }
    })

    if (userAlredyExist !== null) {
      throw boom.conflict('User with email is already exist!')
    }

    const hashPassword = await bcrypt.hash(data.password, 10)

    const newUser = await models.User.create({
      ...data,
      roleId: 3,
      password: hashPassword
    })

    delete newUser.dataValues.password
    return newUser
  }

  async find () {
    // const query = 'SELECT * FROM TASKS'
    // const [data, metadata] = await sequelize.query(query)
    const rta = models.User.findAll({
      include: ['customer']
    })
    return rta
  }

  async findOne (userId) {
    const user = await models.User.findByPk(userId)
    console.log('----' + user.dataValues)
    if (!user) {
      throw boom.conflict('User not found!')
    }
    return user.dataValues
  }

  async update (userId, data) {
    // const productIndex = this.products.findIndex(p => p.id === productId)
    // // console.log(productIndex)
    // if (productIndex === -1) {
    //   throw boom.notFound('No se encontró el producto')
    // }
    // const product = this.products[productIndex]
    // const updatedProduct = {
    //   ...product,
    //   ...data
    // }
    // this.products[productIndex] = updatedProduct

    const userUpdated = await models.User.update({
      ...data
    }, {
      where: {
        id: userId
      }
    })
    return userUpdated
  }

  async delete (userId) {
    // const productIndex = this.products.findIndex(p => p.id = productId)
    // if (productIndex == -1) {
    //   throw boom.notFound('No se encontró producto')
    // }
    // this.product.splice(productIndex, 1)

    const user = await models.User.findByPk(userId)

    if (!user) {
      throw boom.conflict('User not found')
    }

    await models.User.destroy({
      where: {
        id: userId
      }
    })
    return 1
  }
}

module.exports = UserService

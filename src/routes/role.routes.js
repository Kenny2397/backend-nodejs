const express = require('express')
const router = express.Router()

const RoleService = require('./../services/role.services')
const roleService = new RoleService()

// const { validatorHandler } = require('../middlewares/validator.handler')

/** CREATE ROLE */
router.post('/',
  async (req, res, next) => {
    try {
      const newRole = await roleService.create(req.body)
      res.json(newRole)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

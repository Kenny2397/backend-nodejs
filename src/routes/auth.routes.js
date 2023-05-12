const express = require('express')
const passport = require('./../utils/auth')
const jwt = require('jsonwebtoken')

const { config } = require('./../config/config')

const router = express.Router()

/**
 * @openapi
 * /api/v1/auth/login:
 *    post:
 *      tags:
 *        - Auth
 *      summary: "Login user"
 *      description: Iniciar sesion a un nuevo usuario y obtener el token de sesión
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/login"
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/login"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/login'
 *        '400':
 *          description: "Error: Bad Request"
 *        '401':
 *          description: "Error: Unauthorized"
 *        '409':
 *          description: "Error: Conflict"
 */
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      const payload = {
        sub: user.id,
        role: user.roleId
      }
      const token = jwt.sign(payload, config.jwtSecret)
      res.status(200).json({
        user,
        token
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

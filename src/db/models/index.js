const { User, UserSchema } = require('./user.model')
const { Role, RoleSchema } = require('./role.model')
const { Restaurant, RestaurantSchema } = require('./restaurant.model')
const { Dish, DishSchema } = require('./dish.model')
const { Category, CategorySchema } = require('./category.model')
// const { Order, OrderSchema } = require('./order.model')
// const { OrderDish, OrderDishSchema } = require('./order-dish.model')
// const { RestaurantEmployee, RestaurantEmployeeSchema } = require('./restaurant-employee.model')

function setupModels (sequelize) {
  Role.init(RoleSchema, Role.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
  Restaurant.init(RestaurantSchema, Restaurant.config(sequelize))
  Dish.init(DishSchema, Dish.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  // Order.init(OrderSchema, Order.config(sequelize))
  // OrderDish.init(OrderDishSchema, OrderDish.config(sequelize))
  // RestaurantEmployee.init(RestaurantEmployeeSchema, RestaurantEmployee.config(sequelize))

  Role.associate(sequelize.models)
  User.associate(sequelize.models)
  Restaurant.associate(sequelize.models)
  Dish.associate(sequelize.models)
  Category.associate(sequelize.models)
  // Order.associate(sequelize.models)
  // OrderDish.associate(sequelize.models)
  // RestaurantEmployee.associate(sequelize.models)
}

module.exports = setupModels

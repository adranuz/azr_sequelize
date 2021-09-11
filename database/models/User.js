const { Model, DataTypes } = require('sequelize')

const sequelize = require('../db')

class User extends Model { }
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: {
        args: true,
        msg: "Letters and numbers only"
      },
      len: {
        args: [3, 20],
        msg: "Should be between 3 and 20 chars"
      },
      notNull: {
        msg: "This can not be empty"
      }
    }
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: {
        args: true,
        msg: "Should be a number"
      },
      ownValidation (value) {
        if (value >150 || value < 18) {
          throw new Error("It must be a valid age")
        }
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    // unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: "Should be a valid email"
      },
      notNull: {
        msg: "This can not be empty"
      }
    }
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: "users",
  timestamps: false,
})

module.exports = User
const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.todo = require("../models/todo.model.js")(sequelize, Sequelize);
db.todoItem = require("../models/todoItem.model.js")(sequelize, Sequelize)


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

  
  db.todo.hasMany(db.todoItem, {
  as: 'todoItems',
  foreignKey: 'todoId',
    hooks:true,
    onDelete: 'CASCADE',
  });
  db.todoItem.belongsTo(db.todo, {
    foreignKey: 'todoId',
    as: 'todo',
  });
  db.user.hasMany(db.todo, {
  as:'todos',
  foreignKey: 'userId',
  hooks:true,
  onDelete: 'CASCADE',
  });
  db.todo.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
    
  });

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
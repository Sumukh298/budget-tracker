const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, DataTypes);
db.transaction = require("./transaction.model.js")(sequelize, DataTypes);
db.category = require("./category.model.js")(sequelize, DataTypes);
db.bankAccount = require("./bankAccount.model.js")(sequelize, DataTypes);

// Associations
db.user.hasMany(db.transaction);
db.transaction.belongsTo(db.user);

db.user.hasOne(db.bankAccount);
db.bankAccount.belongsTo(db.user);

db.category.hasMany(db.transaction);
db.transaction.belongsTo(db.category);

module.exports = db;

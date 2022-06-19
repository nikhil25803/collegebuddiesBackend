const connectionString = process.env.DATABASE_URL
const Sequelize = require('sequelize-cockroachdb');
const sequelize = new Sequelize(connectionString)
// Model

const Model = sequelize.define("model", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
    },
    balance: {
        type:Sequelize.INTEGER,
    },
})

module.exports = Model;
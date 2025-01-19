const {Sequelize, DataTypes}= require('sequelize')
const dbConfig = require('../config/dbConfig')
const makeBlogModel = require('./blogModel')
const makeUserModel = require('./userModel')

const sequelize= new Sequelize(dbConfig.db,dbConfig.username,dbConfig.password,({
    host : dbConfig.host,
    port : dbConfig.port,
    dialect : dbConfig.dialect,
    operatorsAliases : false,
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }

}))

sequelize.authenticate()
.then(()=>{
    console.log('password and username match')
})
.catch((err)=>{
    console.log('something error',err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize =sequelize

// create blog model
db.blogs = makeBlogModel(sequelize,DataTypes)

// create user model 
db.users = makeUserModel(sequelize,DataTypes)

db.sequelize.sync({force: false}).then(()=>{
    console.log('sync Done')
})

module.exports = db
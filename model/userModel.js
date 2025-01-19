const makeUserModel = (sequelize, DataTypes)=>{
    const User = sequelize.define('user',{
        email : {
            type : DataTypes.STRING,
            allowNull: false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false 
        },
        passwordConfirm : {
            type : DataTypes.STRING,
            allowNull : false 
        }

    })
    return User 

} 
module.exports = makeUserModel
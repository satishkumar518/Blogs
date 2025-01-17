const makeBlogModel = (sequelize, DataTypes)=>{
   const Blog = sequelize.define('blog',{
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    subtitle : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type : DataTypes.TEXT,
        allowNull : false

    }

   })
   return Blog
}

module.exports = makeBlogModel
//use express
const express=require('express')
const { blogs } = require('./model/index')
const { where } = require('sequelize')
const app=express()

// import index file inside the model
require('./model/index')

// use ejs
app.set('view engine','ejs')

// handle form date 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// create api 
app.get('/',async(req,res)=>{
    // read all data from database
    const allBlog =await blogs.findAll()
    
    res.render('home', {blogs:allBlog})
})
app.get('/createblog',(req,res)=>{
    res.render('createblog')
})

// insert data into database
app.post('/createblog',async(req,res)=>{
    const title = req.body.title
    const subtitle =req.body.subtitle
    const description = req.body.description
    await blogs.create({
        title : title,
        subtitle : subtitle,
        description : description
    })
    res.redirect('/')
})

// read single blog
app.get('/read/:id',async(req,res)=>{
    const id = req.params.id
    const singleBlog =await blogs.findAll({
        where: {
          id : id  
        }
    })
    res.render('viewsingleblog', {singleBlog:singleBlog})
})

// delete single blog
app.get('/delete/:id',async(req,res)=>{
    const id = req.params.id
   await blogs.destroy({
        where :{
            id : id
        }
    })
    res.redirect('/')
})

// edit blog
app.get('/edit/:id',(req,res)=>{
 console.log('edit')

})

// port to run project
app.listen(3000,()=>{
    console.log('project will be ready on port no 3000')
})
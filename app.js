//use express
const express=require('express')
const { blogs } = require('./model/index')
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
    const allBlog =await blogs.findAll()
    
    res.render('home', {blogs:allBlog})
})
app.get('/createblog',(req,res)=>{
    res.render('createblog')
})

app.post('/createblog',async(req,res)=>{
    const title = req.body.title
    const subtitle =req.body.subtitle
    const description = req.body.description
    await blogs.create({
        title : title,
        subtitle : subtitle,
        description : description
    })
    res.send("data submitted successfully")
})

// port to run project
app.listen(3000,(req,res)=>{
    console.log('project will be ready on port no 3000')
})
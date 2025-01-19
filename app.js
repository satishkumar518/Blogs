//use express
const express=require('express')
const { blogs } = require('./model/index')
const { users } = require('./model/index')
const { where } = require('sequelize')
const bcrypt =require('bcryptjs')
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
app.get('/edit/:id',async(req,res)=>{
    const id = req.params.id
    const data =await blogs.findAll({
        where : {
            id : id
        }
    })
  res.render('editform', {data:data})

})

app.post('/edit/:id',async(req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const subtitle = req.body.subtitle 
    const description = req.body.description
    await blogs.update({
        title : title,
        subtitle : subtitle,
        description : description
    },{
        where :{
            id : id 
        }
    })
    res.redirect('/')
})

// register page 
app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async(req,res)=>{
    const {email, password, passwordConfirm}= req.body
    await users.create({
        email : email,
        password : bcrypt.hashSync(password,8),
        passwordConfirm : bcrypt.hashSync(passwordConfirm,8)
    })

    res.redirect('/login')
})

// login page
app.get('/login',(req,res)=>{
   res.render('login')
})

app.post('/login',(req,res)=>{
    const {email,password} = req.body
    res.send('submit login form')
})


// port to run project
app.listen(3000,()=>{
    console.log('project will be ready on port no 3000')
})
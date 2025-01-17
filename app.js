//use express
const express=require('express')
const app=express()

// import index file inside the model
require('./model/index')

// use ejs
app.set('view engine','ejs')

// handle form date 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// create api 
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/createblog',(req,res)=>{
    res.render('createblog')
})

app.post('/createblog',(req,res)=>{
    console.log(req.body)
    res.send('data submited successfully')
})

// port to run project
app.listen(3000,(req,res)=>{
    console.log('project will be ready on port no 3000')
})
// import dataService file form service folder

const dataservice = require('./service/dataservice')
// import jsonwebtoken
const jwt = require('jsonwebtoken')
// import express
const express = require('express')
const { json } = require('express')

// create app

const app = express()
// to covert json datas
app.use(express.json())

// middleware for verify the token

const jwtmiddleware = (req, res, next) => {
    console.log("Router specific middleware");
    try{
    const token = req.headers['access-token']
    const data = jwt.verify(token, "secretkeypingpong")
    console.log(data);
    next()
    }
    catch{
        res.status(404).json({
            statusCode:404,
            status:false,
            message:"please login"
        })
    }
}
//  request


// register

app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.acno, req.body.uname, req.body.psw)
    res.status(result.statusCode).json(result)
})
// login
app.post('/login', (req, res) => {
    const result = dataservice.login(req.body.acno, req.body.psw)
    res.status(result.statusCode).json(result)
})
// deposit
app.post('/deposit', jwtmiddleware, (req, res) => {
    const result = dataservice.deposit(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})
// withdraw
app.post('/withdraw',jwtmiddleware, (req, res) => {
    const result = dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})
// transaction history
app.post('/transaction',jwtmiddleware, (req, res) => {
    const result = dataservice.gettransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})
// delete

//  GET

// app.get('/',(req,res)=>{
//     res.send('GET Method Checking ')
// })
// //  post

// app.post('/',(req,res)=>{
//     res.send('post Method Checking ')
// })
// //  put

// app.put('/',(req,res)=>{
//     res.send('put Method Checking ')
// })
// // patch

// app.patch('/',(req,res)=>{
//     res.send('patch Method Checking ')
// })
// // delete

// app.delete('/',(req,res)=>{
//     res.send('delete Method Checking ')
// })

// //  set port

app.listen(3000, () => {
    console.log("server started at port num 3000");
})
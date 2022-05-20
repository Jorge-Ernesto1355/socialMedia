const express = require('express')
const connectDB = require('./db/Connect')
const morgan = require('helmet')
const Auth = require('./auth/authUser.routes')
const UserRoute = require('./users/infrastructure/User.routes')
const PostRoute = require('../Post/infrastucture/PostRoute.routes')
const fileUpload = require('express-fileupload')
const createRoles = require('../src/roles/application/createAllRoles')


const app = express()
const server = app.listen()



class Server{


  constructor(){
    this.app  = express()
    this.port = process.env.PORT || '3000'
    
    this.middlewares()
    this.router()
    this.DBconnection()
  } 

  middlewares(){
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:true}))
    this.app.use(fileUpload({
      useTempFiles:true, 
      tempFileDir:'./src/upload'
    }))
    this.app.use(morgan('dev'))
    createRoles();
    
    
    


  }

  DBconnection(){
     connectDB()
  }

  router(){
    this.app.use('/api/v1/auth' , Auth )
    this.app.use('/api/v1/users', UserRoute)
    this.app.use('/api/v1/post', PostRoute)
    this.app.get('/test', (req, res)=>{
      res.status(200).json({username:"jorge", email:"jorge",password:"password"})
    })
  }



  listen(){
    this.app.listen(this.port, ()=>{
      console.log('ejecutando en:', this.port)
    })
  }
}

module.exports = {Server, app ,server }
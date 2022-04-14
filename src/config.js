const express = require('express')
const connectDB = require('./db/Connect')
const morgan = require('helmet')
const Auth = require('./auth/authUser.routes')
const UserRoute = require('./users/infrastructure/User.routes')



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
    this.app.use(morgan('dev'))
  }

  DBconnection(){
     connectDB()
  }

  router(){
    this.app.use('/api/v1/auth' , Auth )
    this.app.use('/api/v1/users', UserRoute)
  }



  listen(){
    this.app.listen(this.port, ()=>{
      console.log('ejecutando en:', this.port)
    })
  }
}

module.exports = Server
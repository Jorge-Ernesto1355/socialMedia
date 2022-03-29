const express = require('express')
const connectDB = require('./db/Connect')



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
   
    
  }

  DBconnection(){
     connectDB()
     

  }

  router(){
  
    
  }



  listen(){
    this.app.listen(this.port, ()=>{
      console.log('ejecutando en:', this.port)
    })
  }
}

module.exports = Server
const {Server} = require('./config')
const dotenv  = require('dotenv')

  dotenv.config()


const server = new Server
const main = ()=>{
  server.listen()
}

main()

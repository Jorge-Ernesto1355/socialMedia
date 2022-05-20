const mongoose = require('mongoose')

const connectDB = async ()=> {
    const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = process.env

    const connectioString = NODE_ENV === 'test' 
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI
    try{
        await mongoose.connect('mongodb://0.0.0.0:27017/socialmediaTest')
        console.log('database connected')
    }catch(e){
        console.log(e)
    }
}

module.exports = connectDB


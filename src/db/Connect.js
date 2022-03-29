const mongoose = require('mongoose')

const connectDB = async ()=> {
    try{
        await mongoose.connect("mongodb://0.0.0.0:27017/socialmedia")
        console.log('database connected')
    }catch(e){
        console.log(e)
    }
}

module.exports = connectDB


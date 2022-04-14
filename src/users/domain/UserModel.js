const {Schema,model} = require('mongoose')

const User = new Schema({
      username:{
        type:String, 
        require:true, 
        min:5, 
        max:15,
        unique:true,
        trim:true
      },
      email:{
        type:String,
        required:true, 
        max:50,
        unique:true,

      },
      password:{
        type:String,
        required:true,
        min:6
        },
       coverPicture:{
         type:String,
         default:""
       },
       followers:{
         type:Array,
         default:[]
       },
       followings:{
         type:Array,
         default:[]
       },
      desription:{
        type: String, 
        max:80, 
        trim:true
      },
      imageProfile:{
        url:String,
        public_id:String
      },
      Admin:{type:Boolean,
      default:false
    },
    resetToken:{
      type:String,
      default:""
      
    },
      relationShip:{
        type:Object,
        default:{}
       
      }
  }, {
    timestamps:true
  })
  module.exports = model('User', User)
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
       coverPicture:{url:String, public_id:String},
       friends:{
         type:Array,
         default:[]
       },
       friendsWaiting:{
         type:Array, 
         default:[]
       }, 
      desription:{
        type: String, 
        max:80, 
        trim:true
      },
      posts:[{
        ref:"Post", 
        type:Schema.Types.ObjectId
      }], 
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
    relationShipWaiting:[{
      ref:'User',
      type:Schema.Types.ObjectId
    }], 

    relationShip:{
        type:Object,
        default:{user:Schema.Types.ObjectId}
       
      }
  }, {
    timestamps:true
  })

  User.set('toJSON', {
    transform:(document,returnObject)=>{
      returnObject.id = returnObject._id
      delete returnObject._id
      delete returnObject._v

    }
  })

  
  module.exports = model('User', User)
const {app, server} = require('../config')
const supertest = require('supertest')
const  api = supertest(app)
const initialusers = [
  {
    _id: "6260a296961c376bd1634c12",
		username: "eeedd",
		email: "jorgedsssdd@gmail.com",
		password: "$2b$10$kqT/pwFAxKU0UndiE9VDSe5tXz3mPE9BbIqR0JWbuHJrxgEzndSDu",
		coverPicture: "",
		followers: [],
		followings: [],
		Admin: false,
		resetToken: "",
	  createdAt: "2022-04-21T00:17:26.717Z",
		updatedAt: "2022-04-21T00:17:26.717Z",
		__v: 0}
]

const getAll = async ()=>{
  const response = await api.get('/api/v1/users')
  console.log({response})
  return {
    users: response.body.map(user => user.username),
    response
}
  } 
 const user = {
    username: "jorge",
		email: "jorge@gmail.com",
		password: "jorge"
  }


module.exports = {
  user, 
  getAll,
  server,
  api,
  initialusers
}
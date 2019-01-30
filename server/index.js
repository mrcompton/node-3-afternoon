const express = require('express')
//converts the data which is sent as text over the internet back into json, so javascript can interpret it
const bodyParser = require('body-parser')
//turns env file into javascript
require('dotenv').config()
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl= require('./controllers/swag_controllers')
const authCtrl = require('./controllers/auth_controller')
const cartCtrl = require('./controllers/cart_controller')
const searchCtrl = require('./controllers/search_controller')

//assigning express package to the variable app
const app = express()

//top-level middleware, which is invoked everytime app is used on each endpoint
app.use(bodyParser.json())
//
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use( checkForSession )
app.use( express.static( `${__dirname}/../build`))


app.get('/api/swag',swagCtrl.read)
app.post('/api/login',authCtrl.login)
app.post('/api/register',authCtrl.register)
app.post('/api/signout',authCtrl.signout)
app.get('/api/user',authCtrl.getUser)
app.post('/api/cart',cartCtrl.add)
app.post('/api/cart/checkout',cartCtrl.checkout)
app.delete('/api/cart', cartCtrl.delete)
app.get('/api/search',searchCtrl.search)


const PORT = process.env.SERVER_PORT
app.listen(PORT, console.log(`Loud and clear at ${PORT}`))
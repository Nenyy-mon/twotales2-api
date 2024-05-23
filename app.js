const express = require('express');
const app = express()
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
app.set("trust proxy", true);

app.use(cors({
    credentials: true,
    origin: true
}));

app.use(cookieParser())

app.options('*', cors)
//ENV
const apiShop = process.env.SHOP_API
const apiprivateUser = process.env.API_PRIVATEUSER
const apicompanyUser = process.env.API_COMPANYUSER
const apiProfile = process.env.API_PROFILE
const uri = process.env.DB_URI;
const cartApi = process.env.CART_API;

mongoose.connect(uri)
    .then(() => {
        console.log('Database connection is ready')
    })
    .catch((err) => {
        console.log(err)
    })



app.use(morgan('tiny'))

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))


// models 
const productsRouter = require('./routers/products.js');
const privateUserRouter = require('./routers/privateUser.js');
const companyUserRouter = require('./routers/companyUser.js');
const profileRouter = require('./routers/privateUserProfile.js');
const bodyParser = require('body-parser');
const privateUser = require('./models/privateUser.js');
const cartRouter = require('./routers/cart.js')
//routes
app.use(`${apiShop}`, productsRouter)
app.use(`${apiprivateUser}`, privateUserRouter)
app.use(`${apicompanyUser}`, companyUserRouter)
app.use(`${apiProfile}`, profileRouter)
app.use(`${cartApi}`, cartRouter)


//middleware
app.use(bodyParser.urlencoded({
    extended: true

}))



app.listen(1534, () => {
    console.log('server running now on http://localhost:1534')

});

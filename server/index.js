const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const checkForSession = require("./middlewares/checkForSession.js");
const sc = require("./controllers/swag_controller.js");
const auth_controller = require("./controllers/auth_controller.js");
const cart_controller = require("./controllers/cart_controller.js");
const search_controller = require("./controllers/search_controller.js");
require("dotenv").config();

const app = express();

 


// middlewares
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SECRET_VALUE,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

// end points
// swag
app.get(`/api/swag`, sc.read);

// auth
app.post(`/api/login`, auth_controller.login);
app.post(`/api/register`, auth_controller.register);
app.post(`/api/signout`, auth_controller.signout);
app.get(`/api/user`, auth_controller.getUser);

// cart
app.post(`/api/cart`, cart_controller.add);
app.post(`/api/cart/checkout`, cart_controller.checkout);
app.delete(`/api/cart`, cart_controller.delete);

// search
app.get(`/api/search`, search_controller.search);


const {SERVER_PORT} = process.env; // can only descructuring once from .env
app.listen(SERVER_PORT, () => {
    console.log(`you are in port ${SERVER_PORT}`);
});

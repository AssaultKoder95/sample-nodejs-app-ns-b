const express = require("express");
const userRoutes = require("./users");

const router = express.Router();

/*
- api
    - users
        - / GET
        - /:userId GET
        - / POST
        - /:userId PUT
        - /:userId DELETE
    - products
        - / GET
        - /:productId GET
        - / POST
        - /:productId PUT
        - /:productId DELETE 
    - Authentication
        - /signup
        - /login
        - /forgot-password
        - /reset-password
*/

/*

API related Info

Products
Orders
Invoice
Checkout
User Profile
Authentication ( signup, login, change password x 2 API )

// 1st reset password ( checks if the user exists in our system / not )
// if they do, send them a link to create a new password

// 2nd change password : which basically recieves a token ( that has user info )
and then tries to change the user password
- It may / may not have old password field

*/

router.use("/users", userRoutes);

module.exports = router;

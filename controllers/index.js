/*

USE CASE for making the function names
in accordance to the files they are part of

POST /orders
{
    userId: '',
    productIds: ['123', '124', '125']
}

While Processing
// getSingleUser
// getSingleProductDetails
// OR getProductDetails([ array of strings: productIds ])

RETURNS 

{
    userAddress: '',
    userPhoneNumber: '',
    totalBillValue: 150,
    itemCount: 3,
    orderedItems: [{
        id: '123',
        name: 'Shahi Paneer',
        value: 150,
        qty: 1
    }, {}, {}]
}

*/

const users = require("./users");

module.exports = { users };

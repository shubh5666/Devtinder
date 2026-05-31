const jwt = require("jsonwebtoken");
const User = require("../models/user");


// ======================================================
// USER AUTHENTICATION MIDDLEWARE
//
// Purpose:
//
// Check whether the user is logged in.
//
// Example:
//
// Rahul logs into DevTinder.
//
// After successful login:
//
// 1. JWT token is generated
// 2. Token is stored inside cookies
//
// Whenever Rahul accesses a protected route:
//
// GET /profile/view
// POST /request/send
//
// This middleware verifies the token
// and identifies Rahul.
//
// If token is valid:
//
// ✅ Request continues
//
// If token is invalid:
//
// ❌ Request is blocked
//
// ======================================================

const userAuth = async (req, res, next) => {

    try {

        // Read JWT token from browser cookies.
        //
        // Example:
        //
        // token = eyJhbGciOiJIUzI1Ni...
        const { token } = req.cookies;

        if(!token){
            return res.status(401).send("PLease login")
        }

        // Verify whether the token
        // was created by our application.
        //
        // If token is invalid,
        // jwt.verify() will throw an error.
        const decodedObj = await jwt.verify(
            token,
            "DEVTinder123"
        );


        // Extract user id from token payload.
        //
        // Example:
        //
        // {
        //    _id: "123abc"
        // }
        const { _id } = decodedObj;


        // Find the logged-in user
        // inside MongoDB.
        //
        // Example:
        //
        // _id = Rahul's id
        //
        // Fetch Rahul's complete profile.
        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User not found");
        }


        // Attach user object to req.user.
        //
        // This allows future route handlers
        // to access the logged-in user's data.
        //
        // Example:
        //
        // req.user.firstName
        // req.user.emailId
        req.user = user;


        // Move control to the next middleware
        // or route handler.
        next();

    }

    catch (err) {

        // If token is invalid,
        // expired, or user does not exist,
        // return an error response.
        res.status(400).send("Error : " + err.message);

    }

};

module.exports = { userAuth };



/*
======================================================
USER AUTHENTICATION FLOW
======================================================

1. User logs in

2. JWT token is generated

3. Token is stored inside cookies

4. User accesses a protected route

5. userAuth middleware runs

6. Token is read from cookies

7. Token is verified

8. User id is extracted from token

9. User is fetched from MongoDB

10. User data is attached to req.user

11. Request moves to next route handler

12. Protected API can now use
    logged-in user information

======================================================
*/
const express = require('express');
const authRouter = express.Router();


const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendWelcomeEmail = require("../utils/sendEmail");


// ==========================================
// AUTHENTICATION ROUTES
//
// Handles:
// 1. Signup
// 2. Login
// 3. Logout
// ==========================================



  // ==========================================
// SIGNUP API
//
// Register a new user.
// ==========================================

authRouter.post("/signup", async (req, res) => {

    try {

        // Validate incoming user input
      
        validateSignUpData(req);

        const {
            firstName,
            lastName,
            emailId,
            password
        } = req.body;


        // Convert plain password into
        // encrypted password.
        
        const passwordHash =
            await bcrypt.hash(password, 10);

        console.log(passwordHash);


        // Create a new user object.
        //
        // At this point user exists only
        // inside Node.js memory.
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });


       // Save user in database
        await user.save();


         await sendWelcomeEmail(
             user.emailId,
              user.firstName
                );


        // Send success response.
        res.send("User is added successfully");

    }
    catch (err) {

        res.status(400).send(err.message);

    }

});



// ==========================================
// LOGIN API
//
// Authenticate an existing user.
// ==========================================

authRouter.post("/login", async (req, res) => {

    try {

        const { emailId, password } = req.body;


        // Find user using email.
       
        const user = await User.findOne({ emailId });

        if (!user) {
            throw new Error(
                "EmailId is not present in DB"
            );
        }


        // Compare entered password
        // with encrypted password
        // stored inside database.
        const isPasswordValid =
            await bcrypt.compare(
                password,
                user.password
            );


        if (isPasswordValid) {

            // Generate JWT token.
            // This token helps identify
            // the logged-in user.
            const token =
                await user.getJWT();


            // Store token inside cookies.
            // Browser will automatically
            // send this token in future requests.
            res.cookie("token", token);

            res.send(user);

        } else {

            throw new Error(
                "There is issues in emailid or password"
            );

        }

    }

    catch (err) {

        res.status(400).send(err.message);

    }

});



// ======================================================
// LOGOUT API
// Log out the current user.
//
// Example:
//
// Rahul clicks logout.
// JWT cookie is removed.
// Rahul is no longer authenticated.
// ======================================================

authRouter.post("/logout", async (req, res) => {

    // Remove JWT token from cookies.
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });

    res.send("Logout Successfully");

});


module.exports = authRouter;





/*
==========================================
AUTHENTICATION FLOW

SIGNUP
1. Validate input
2. Hash password
3. Create user
4. Save user
5. Send response

LOGIN
1. Find user
2. Verify password
3. Generate JWT
4. Store token
5. Login user

LOGOUT
1. Clear token
2. End session

==========================================
*/

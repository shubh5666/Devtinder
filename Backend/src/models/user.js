const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


// ==========================================
// USER SCHEMA
//
// Stores user information.
// ==========================================


const userSchema = new mongoose.Schema({


    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
    },

   
    lastName: {
        type: String
    },


    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },

    // User's encrypted password.
    //
    // Example:
    //
    // Before encryption:
    // Rahul@123
    //
    // After encryption:
    // $2b$10$abcxyz...
    //
    // We never store plain text passwords.
    password: {
        type: String,
        required: true,
    },

   
    age: {
        type: Number,
        min: 18,
    },

   
    gender: {
        type: String,

        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is not a valid gender type`,
        },
    },

    // URL of profile picture.
    //
    // Example:
    // https://xyz.com/photo.jpg
    photoUrl: {
        type: String
    },


    about: {
        type: String,
        default: "This is a default about of the user",
    },

    
    skills: {
        type: [String]
    }

},
{
    // Automatically creates:
    //
    // createdAt
    // updatedAt
    //
    // Useful for tracking user activity.
    timestamps: true,
});


// ======================================================
// JWT TOKEN GENERATION METHOD
//
// Purpose:
//
// Create a JWT token for the user.
//
// JWT helps the application identify
// who is currently logged in.
//
// Example:
//
// Rahul logs in successfully.
//
// A JWT token is generated and stored
// inside browser cookies.
//
// Future requests use this token
// to identify Rahul.
//
// ======================================================

userSchema.methods.getJWT = async function () {

    const user = this;

    const token = await jwt.sign(
        { _id: user._id },
        "DEVTinder123",
        {
            expiresIn: "7d",
        }
    );

    return token;
};


// Create User model from schema.
//
// This model is used to:
//
// - Create users
// - Find users
// - Update users
// - Delete users
module.exports = mongoose.model("User", userSchema);









/*
======================================================
USER MANAGEMENT FLOW
======================================================

1. User signs up

2. User information is validated

3. Password is encrypted

4. User data is stored in MongoDB

5. User logs in

6. JWT token is generated

7. Token is stored inside cookies

8. User accesses protected routes

9. Application identifies user
   using JWT token

10. User can:

    ✅ View profile
    ✅ Edit profile
    ✅ Send connection requests
    ✅ Accept requests

======================================================
*/
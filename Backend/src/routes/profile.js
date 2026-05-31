const express = require('express');
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");


// ==========================================
// PROFILE ROUTES
//
// Handles profile-related operations:
// 1. View Profile
// 2. Edit Profile
// ==========================================




// ==========================================
// VIEW PROFILE API
//
// Returns the profile of the
// logged-in user.
// ==========================================

profileRouter.get(
    "/profile/view",
    userAuth,

    async (req, res) => {

        try {

            // userAuth middleware has already
            // verified the JWT token and
            // attached user data to req.user.
            // req.user = Rahul
            const user = req.user;


           // send profile data(frontend)
            res.send(user);

        }

        catch (err) {

            // Handle unexpected errors.
            res.status(400).send("Invalid Token");

        }

    }
);




// ==========================================
// EDIT PROFILE API
//
// Updates the profile of the
// logged-in user.
// ==========================================

profileRouter.patch(
    "/profile/edit",
    userAuth,

    async (req, res) => {

        try {

            // Check whether user is trying
            // to update only allowed fields.
           
            if (!validateProfileEditData(req)) {
                throw new Error("Invalid edit request");
            }


            // Get currently logged-in user.
            const loggedInUser = req.user;


            // Update profile fields
            Object.keys(req.body).forEach((key) => {
                loggedInUser[key] = req.body[key];
            });


            await loggedInUser.save();

            res.send("Profile updated successfully");

        }

        catch (err) {

            res.status(400).send(err.message);

        }

    }
);

module.exports = profileRouter;



/*
==========================================
PROFILE FLOW

VIEW PROFILE
1. Verify user
2. Fetch profile
3. Return user data

EDIT PROFILE
1. Verify user
2. Validate fields
3. Update profile
4. Save changes
5. Return response

==========================================
*/




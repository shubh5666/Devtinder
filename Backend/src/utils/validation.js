const validator = require('validator');


// ==========================================
// VALIDATION UTILITIES
//
// Helper functions for validating
// user input.
// ==========================================





            
// ==========================================
// SIGNUP DATA VALIDATION
// ==========================================

const validateSignUpData = (req) => {

    const {
        firstName,
        lastName,
        emailId,
        password
    } = req.body;


    // Check if first name and last name are provided
    if (!firstName.trim() || !lastName.trim()) {

        throw new Error("Name is not valid");

    }


    // Validate email format
    else if (!validator.isEmail(emailId)) {

        throw new Error("Email is not valid");

    }


    // Validate password strength
    else if (!validator.isStrongPassword(password)) {

        throw new Error(
            "Please enter a strong password"
        );

    }

};





  // ==========================================
// PROFILE EDIT VALIDATION
//
// Allows updates only to approved fields.
// ==========================================


const validateProfileEditData = (req) => {

    const allowedEditFields = [

        "firstName",
        "lastName",
        "photoUrl",
        "about",
        "skills",
        "age",
        "gender",

    ];


    // Ensure all incoming fields are allowed
    const isEditAllowed =
        Object.keys(req.body).every(
            (field) =>
                allowedEditFields.includes(field)
        );

    return isEditAllowed;

};




module.exports = {
    validateSignUpData,
    validateProfileEditData,
};





/*
==========================================
VALIDATION FLOW

SIGNUP
1. Validate name
2. Validate email
3. Validate password

PROFILE EDIT
1. Validate editable fields
2. Allow or reject request

==========================================
*/
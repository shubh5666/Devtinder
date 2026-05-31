const dns = require("dns");

// ======================================================
// DNS CONFIGURATION
//
// Purpose:
//
// MongoDB Atlas runs on cloud servers.
//
// Sometimes the system cannot correctly
// find MongoDB Atlas servers because of
// DNS resolution issues.
//
// Google DNS servers are very reliable,
// so we use them to avoid connection issues.
//
// ======================================================

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require('mongoose');


// ======================================================
// DATABASE CONNECTION FUNCTION
//
// Purpose:
//
// Connect our Node.js application
// to MongoDB Atlas.
//
// Example:
//
// Rahul signs up on DevTinder.
// Rahul's data needs to be stored
// somewhere permanently.
//
// MongoDB Atlas is the database where
// all user data, connection requests,
// profiles, etc. are stored.
//
// Before using MongoDB:
//
// ❌ Cannot save users
// ❌ Cannot fetch users
// ❌ Cannot send connection requests
//
// After connecting:
//
// ✅ Database operations work
//
// ======================================================

async function connectDB() {

    // Create connection between
    // Node.js application and MongoDB Atlas.
    //
    // If connection is successful,
    // Mongoose can perform CRUD operations.
    await mongoose.connect(
        "mongodb+srv://shubh5666:shubham@cluster0.td5j0of.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0"
    );

}


// ======================================================
// ESTABLISH DATABASE CONNECTION
//
// Purpose:
//
// Call the connectDB function and check
// whether database connection succeeds
// or fails.
//
// ======================================================

connectDB()

    .then(() => {

        // This block runs when database
        // connection is successful.
        //
        // Example:
        //
        // DevTinder successfully connects
        // to MongoDB Atlas.
        console.log("Database connected successfully");

    })

    .catch((err) => {

        // This block runs if connection fails.
        //
        // Possible reasons:
        //
        // 1. Internet issue
        // 2. Wrong connection string
        // 3. MongoDB Atlas unavailable
        // 4. DNS issue
        //
        // Database operations will not work.
        console.error("Database cannot connect");

    });


// Export the function so it can be
// used inside app.js or other files.
module.exports = connectDB;




/*
======================================================
DATABASE CONNECTION FLOW
======================================================

1. Application starts

2. database.js file runs

3. Google DNS servers are configured

4. connectDB() function is called

5. Mongoose sends a connection request
   to MongoDB Atlas

6. MongoDB Atlas accepts the connection

7. Database connection is established

8. Application can now:

   ✅ Save data into MongoDB
   ✅ Fetch data from MongoDB
   ✅ Update data in MongoDB
   ✅ Delete data from MongoDB

======================================================
*/


const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


// ======================================================
// SEND CONNECTION REQUEST API

// This API will create a connection request
// and store it inside MongoDB.
// ======================================================


requestRouter.post("/request/send/:status/:toUserId",

    // userAuth middleware:
//
// 1. Reads JWT token from cookies
// 2. Verifies token authenticity
// 3. Finds the logged-in user
// 4. Attaches user data to req.user
//
// If token is invalid, request stops here.



userAuth,
  
    async(req,res) => {


    try{
               

    // get sender id
      const  fromUserId  =  req.user._id;

      
  // Get the receiver's id from URL.
      
      const toUserId = req.params.toUserId.trim();

          // Prevent sending request to self
      if (fromUserId.equals(toUserId)) {
    return res
        .status(400)
        .json({ message: "Cannot send connection request to yourself" 

        });

      }
          

      // Get request status
      const status = req.params.status;


    const allowedStatus = ["ignored", "interested"];



      // Check validate status
        if (!allowedStatus.includes(status)) {
              return res
              .status(400)
              .json({message: "Invalid status type: " + status});
               
            }

     
       // Check if receiver exists
            const toUser = await User.findById(toUserId);
            if(!toUser){
                return res.status(404).json({message: "User not found"});
            }

                    
      

  // Check for existing connection request
      // in either direction
// If either request exists,
// we stop the process and do not create
// a duplicate connection request.

const existingConnectionRequest = await ConnectionRequest.findOne({
    $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
    ],
});
             
           

         // Prevent duplicate requests
            if(existingConnectionRequest){
                return res
                .status(400)
                .send({message:"Connection Request Already Exists"});
            }



    // Create a new connection request object.
      
        const  connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

     // Save request in database
const data = await connectionRequest.save();
       

        //send success response
 res.json({
    message: `${req.user.firstName} has ${status} ${toUser.firstName}`,
    data,
});
        
    }



    catch(err){
         res.status(400).send("Error: " + err.message);
    }

}

);







// ==========================================
// REVIEW CONNECTION REQUEST API
//
// Accepts or rejects a pending
// connection request.
// ==========================================

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res) => {
     try{    
        
     // Logged-in user who is reviewing
    const loggedInUser = req.user;


     console.log("Logged In User ID:", loggedInUser._id);

    // Extract values from URL.
// Example:
//
// /request/review/accepted/6848ab123
// status = accepted
// requestId = 6848ab123
   const { status } = req.params;
const requestId = req.params.requestId.trim();




    const allowedStatus = ["accepted", "rejected"];

        // Validate the status.
    if(!allowedStatus.includes(status)) {
        return res.status(400).json({
            message:"Status not allowed",
        });

    }


    console.log("Request ID:", requestId);
console.log("Logged In User ID:", loggedInUser._id);



         // Find the exact connection request.
      //
      // Conditions:
      //
      // 1. Request id must match.
      // 2. Logged-in user must be receiver.
      // 3. Request should still be pending.
      //
      // Example:
      //
      // Rahul -> Shubham (interested)
      //
      // Only Shubham can review it.
    const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId:loggedInUser._id,
        status:"interested",
    });

    console.log("Found Request:", connectionRequest);


       // If request is not found,
      // return an error.
    if(!connectionRequest){
        return res
        .status(404)
        .json({message: "Connection request not found",

        });

    }


       
      // Change request status.
      //
      // interested -> accepted
      // OR
      // interested -> rejected
       connectionRequest.status = status;

// Store the connection request permanently in MongoDB.
//
// Before save():
// Request exists only inside Node.js memory.
//
// After save():
// Request is stored in MongoDB and can
// be fetched later using database queries
          const data = await connectionRequest.save();



               // Send success response.
          res.json({ message: "Connection request " + status,data,

          });

     }
     catch(err){
        res.status(400).send("ERROR : " + err.message);
     }

    }

);


module.exports = requestRouter;




/*
==========================================
CONNECTION REQUEST FLOW

SEND REQUEST
1. Verify user
2. Validate receiver
3. Validate status
4. Check existing request
5. Create request
6. Save request
7. Return response

REVIEW REQUEST
1. Verify user
2. Validate status
3. Find pending request
4. Update status
5. Save request
6. Return response

==========================================
*/


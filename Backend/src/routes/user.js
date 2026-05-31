

const express = require('express');
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


// ==========================================
// RECEIVED CONNECTION REQUESTS API
//
// Returns all pending connection requests
// received by the logged-in user.
// ==========================================


userRouter.get(
  "/user/request/received",
  userAuth,

  async (req, res) => {

    try {

   
      const loggedInUser = req.user;


      // Find all pending connection requests.
      //
      // Conditions:
      //
      // 1. Request is sent TO Rahul.
      // 2. Status is still interested.
      //
      // Example:
      //
      // Aman  -> Rahul (interested)
      // Rohit -> Rahul (interested)
      //
      // Both requests will be returned.
      const connectionRequest =
        await ConnectionRequest.find({
          toUserId: loggedInUser._id,
          status: "interested",
        })
        .populate(
          "fromUserId",
          USER_SAFE_DATA
        );


      // populate sender details
      console.log(
        "Requests Found:",
        connectionRequest
      );


      // Send pending requests
      // to frontend.
      res.json({
        message:
          "Data fetched successfully",
        data: connectionRequest,
      });

    }

    catch (err) {

      res.status(400).send(
        "ERROR : " + err.message
      );

    }

  }
);

const USER_SAFE_DATA = "firstName lastName photoUrl  gender age about skills";


/*
==========================================
RECEIVED REQUEST FLOW

1. Verify user
2. Find pending requests
3. Populate sender details
4. Return response

==========================================
*/



// ==========================================
// USER CONNECTIONS API
//
// Returns all accepted connections
// of the logged-in user.
// ==========================================


userRouter.get("/user/connections", userAuth, async (req, res) => {

    try {

        const loggedInUser = req.user;

         // Fetch accepted connections
        const connectionRequests =
            await ConnectionRequest.find({
                $or: [

                    {
                        toUserId: loggedInUser._id,
                        status: "accepted",
                    },

                    {
                        fromUserId: loggedInUser._id,
                        status: "accepted",
                    },

                ],
            })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);


        // Extract connected user
        const data = connectionRequests.map((row) => {

            // If logged-in user is sender
            if (
                row.fromUserId._id.toString() ===
                loggedInUser._id.toString()
            ) {

                return row.toUserId;

            }

            // Otherwise return sender.
            return row.fromUserId;

        });


        // Send connection list
        // back to frontend.
        //
        // Frontend can show:
        //
        // Connected Users
        // Chat List
        // Friends List
        res.json({
            data,
        });

    }

    catch (err) {

        res.status(400).send({
            message: err.message,
        });

    }

});

/*
==========================================
CONNECTIONS FLOW

1. Verify user
2. Find accepted connections
3. Extract connected user
4. Return response

==========================================
*/




// ======================================================
// FEED API
//
// Purpose:
//
// Show new users that can appear
// on DevTinder feed.
//
// Feed should NOT show:
//
// ❌ Own profile
// ❌ Accepted connections
// ❌ Ignored users
// ❌ Already sent requests
// ❌ Already received requests
//
// Feed should show:
//
// ✅ New users only
//
// ======================================================

userRouter.get("/feed", userAuth, async (req, res) => {

    try {

    
        const loggedInUser = req.user;


          // Pagination
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

       // Maximum users per request
        limit = limit > 50 ? 50 : limit;

           // Calculate records to skip
        const skip = (page - 1) * limit;


      
        // Fetch all related connection requests
        
        const connectionRequests =
            await ConnectionRequest.find({
                $or: [
                    {
                        fromUserId: loggedInUser._id,
                    },
                    {
                        toUserId: loggedInUser._id,
                    },
                ],
            }).select("fromUserId toUserId");


       
       // Store users hidden from feed
      
        const hideUsersFromFeed = new Set();


        // Add both sender and receiver
        // to hidden users list.
        
        connectionRequests.forEach((req) => {

            hideUsersFromFeed.add(
                req.fromUserId.toString()
            );

            hideUsersFromFeed.add(
                req.toUserId.toString()
            );

        });


       
        hideUsersFromFeed.add(
            loggedInUser._id.toString()
        );


        console.log(hideUsersFromFeed);


         // Fetch feed users
        const users = await User.find({
            _id: {
                $nin: Array.from(hideUsersFromFeed),
            },
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

      
        res.send(users);

    }

    catch (err) {

        res.status(400).json({
            message: err.message,
        });

    }

});


/*
==========================================
FEED FLOW

1. Verify user
2. Fetch connection requests
3. Create hidden users list
4. Fetch feed users
5. Apply pagination
6. Return response

==========================================
*/


module.exports = userRouter;
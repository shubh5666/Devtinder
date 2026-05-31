const mongoose = require('mongoose');


// ==========================================
// CONNECTION REQUEST SCHEMA
//
// Stores connection requests between users.
// ==========================================

const connectionRequestSchema = new mongoose.Schema({

       // User who sends the request
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",  // refernce to the user connection
        required: true
    },


    // User who receives the request
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },


      // Current status of the request

    status: {
        type: String,
        required: true,

        enum: {

            values: [
                "ignored",
                "interested",
                "accepted",
                "rejected"
            ],

            message: `{VALUE} is incorrect status type`,
        },
    },

},

{ // Automatically adds:
    // createdAt
    // updatedAt
    timestamps: true,
}

);

// Create ConnectionRequest model
module.exports = mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);




/*
==========================================
CONNECTION REQUEST FLOW

1. User sends a request

2. Sender id is stored in fromUserId

3. Receiver id is stored in toUserId

4. Initial status is "interested"

5. Request is saved in MongoDB

6. Receiver reviews request

7. Status can become:
   - accepted
   - rejected
   - ignored

==========================================
*/



//Routing and request handlers

// const express = require('express');
// const app = express();


//  app.use("/test", (req,res) => {
//     res.send("Hello lmotudfv elaa chustanu  ");
//  });


// app.use("/",(req,res) => {
//     res.send("HAHAHAHAHAHAHAH");
// });


// //app.use() handle all https modules

//  app.use("/user",(req,res) => {
//     res.send("Data sucessfully saved to database");
//  });  

//  app.use("/hello", (req,res) => {
//     res.send("Hello sululu  bsdfueri ");
//  });

//  app.use("/test",(req,res) => {
//     res.send("Hello from the server");
//  });



// app.get() only handle get requests
// app.get("/user",(req,res) => {
//     res.send({firstname : "shubham" , lastname : "chauhan"});
// });


//  app.post("/hello", (req,res) => {
//     res.send("Hello sululu  bsdfueri ");
//  });

//   app.delete("/hello", (req,res) => {
//     res.send("successfully deleted ");
//  });



// app.listen(3000 , () => {
//     console.log("server is successfully listening on port 3000")
// });











// Route handling

// const express = require('express');
// const app = express();

// app.use("/user",
//     (req,res,next) => {
//         // route handler 1
//         console.log("Handling the routr 1  user!!");
//         // res.send("1st response");  // res.send() is use when we want to finish the request.
//          next();

//     },

//     (req,res,next) => {
//         // route handler 2
//         console.log("Handling the routr 2  user!!");
//         // res.send("2nd response");
//         next();
//     },
//       (req,res,next) => {
//        // route handler 3
//         console.log("Handling the routr 3  user!!");
//         // res.send("3rd response");
//         next();
//     },
//       (req,res,next) => {
//         // route handler 4
//         console.log("Handling the routr  4 user!!");
//         res.send("4th response");
//         // next();
//     },
//       (req,res) => {
//         // route handler 5
//         console.log("Handling the routr 5 user!!");
//         // res.send("5th response");
        
//     },


// );


// app.listen(3000 , () => {
//     console.log("server is successfully listening on port 3000")
// });











// // middlware

// const express = require('express');
// const app = express();
// const {adminAuth,userAuth} = require("./middlewares/auth");

// // Handle Auth Middleware for all Get,post , .. request
// app.use("/admin", adminAuth);
// app.use("/admin", userAuth);



// // middleware generally used app.use() bwcoz we can acess all https
//       app.use("/user",userAuth,(req,res) => {
//         res.send("User sent all data");
//       });


//  app.get("/admin/getAllData", (req,res)  => {

//     // logic of checking the request is authorized
//         res.send("All Data sent");
//  });


//  app.get("/admin/deleteUser",(req,res) =>{
//     // logic of checking if hte request is authorized
//     res.send("Deleted a user");
//  });


// app.listen(3000 , () => {
//     console.log("server is successfully listening on port 3000")
// });






// //Error handling

// const express = require('express');
// const app = express();

// app.get("/getUserData",(req,res) => {
//     //logic of DB call and get user data
//     try{

//      throw new Error("dfgdv");
//      res.send("User sent all data");
//                                                       // try & catch used in local-error handling.
//     } 
//     catch(err){
//         res.status(500).send("something went wrong");
//     }
   
//       });
         

//       //global error handling errors
//       app.use("/",(err,req,res,next) => {
//         if(err){
//             res.status(500).send("something went wrong");
//         }  

//       });


// app.listen(3000 , () => {
//     console.log("server is successfully listening on port 3000")
// });





// // signup API
//  app.post("/signup", async (req,res)=> {
//         // also a way to add data
// //         const userObj =  new User({
// //             firstName : "Ranum",
// //             lastName : "Mandal",
// //             emailId : "ramuloo@123",
// //             password : "ramu@123"
// //         });


// //           try{
// //         await  userObj.save();
// //         res.send("user added sucessfully");
// //           }  catch(err){
// //             res.status(400).send("Error saving the user : " + err.message);
// //           }

// //  });



//  // password encruption started from here
//      try{
//            // 1-Validation of data
//             validateSignUpData(req);

//              const {firstName,lastName,emailId,password} = req.body;
//            // 2-Encrypt the password
//           const passwordHash =  await bcrypt.hash(password,10);
//           console.log(passwordHash);

            
//            // second way and write down json format data in postman body in json format.
//            // creating a instance of a user model
//      const user = new User({
//         firstName,
//         lastName,
//         emailId,
//         password:passwordHash,
//      });


//         await user.save();
//         res.send("User Added successfully");
//      }
//      catch(err){
//         res.status(400).send("Error saving the user:" + err.message);
//      }

//  });




//  // login api
//  app.post("/login", async(req,res) => {
//     try{

//         const{emailId,password} = req.body;

//         // find user by email
//         const user = await User.findOne({emailId});

//         if(!user){
//             throw new Error("Invalid Credentials");
//         }

//      // Compare entered password with hashed password
//         const isPasswordValid =
//          await bcrypt.compare(
//             password,
//             user.password 
//         );

//          if(isPasswordValid){
//               throw new Error("Invalid Credentials");

//          }

//             // create jwt token
//              const token = await jwt.sign(
//                 {_id: user._id},
//                 "DEV@Tinder$799"
//             );

                  
//              // add the token to cookies and send response back to user
//                res.cookie("token",token);
//             res.send("Login Successfull");
         
//      }
//      catch(err){
//         res.status(400).send("ERROR : " + err.message);
//      }

//  });
 



 // Profile API (Protected Route)
// userAuth middleware runs first
// It verifies the JWT token and fetches the user from DB

//  app.get("/profile",userAuth, async(req,res) => {
//      try{

//          // userAuth middleware has already attached
//         // the logged-in user to req.user
//        const user = req.user;

//        // send user data back to client
//      res.send(user);
     
//      }catch(err){
//         // handle any unexpected errors
//         res.status(400).send("Invalid Token");
//      }

//  });



//   // sendconnection request
// app.post("/sendConnectionRequest",userAuth,async(req,res) => {
//      const user = req.user;
//  // Sending connection request
//  console.log("Sending a connection requests");
//  res.send( user.firstName + " sent connection request");

// });

    






// // Feed API = GET/feed - get 1 user data from the database
// app.get("/user",async(req,res) => {
//     const userEmail = req.body.emailId;
    
//     //  try{
//     //      const users =  await User.find({
//     //         emailId : userEmail
//     //     });

//     //     if(users.length === 0){
//     //         res.status(404).send("User not found");
//     //     }   else{
//     //         res.send(users);
//     //     }

       
//     //  }


    
//     try{  // if two user with same emailId
       
//     const user= await User.findOne({emailId : userEmail}).exec();
//     res.send(user);
//     }

//     catch(err){
//         res.status(400).send("Something went wrong");
//     }

// });



// // Feed API = GET/feed - get all user data from the database
// app.get("/feed",async(req,res) => {
//     try{
//         const users = await User.find({});
//         res.send(users);

//     }

//    catch(err){
//         res.status(400).send("Something went wrong");
//     }

// });


//  delete user from database
// app.delete("/user", async(req,res)=> {
//     const userId = req.body.userId;
//     try{

//           const deleteUser =   await User.findByIdAndDelete(userId);
//           console.log(deleteUser);
//           res.send("user deleted succesfully");

//     }
//     catch(err){
//          res.status(400).send("Something went wrong");
//     }
// });


// // patch/update the user
// app.patch("/user", async(req,res)=> {
//     const userId = req.body.userId;
//     const data = req.body;


   
//     const ALLOWED_UPDATES = [
//          "photoUrl", "about","gender", "age"
//          ]   
//          const isUpdatedAllowed = Object.keys(data).every( k => ALLOWED_UPDATES.includes(k));
//         if(!isUpdatedAllowed){
//             res.status(400).send("Update not allowed");
//         }



//     try{
//           const updateUser =   await User.findByIdAndUpdate(userId,req.body);
//           console.log(updateUser);
//           res.send("user updated succesfully");

//     }
//     catch(err){
//          res.status(400).send("Something went wrong");
//     }
// });

require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/socket");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
         "devtinder-glhwnkgeo-shubham-chauhans-projects-ad84baf8.vercel.app"
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
.then(() => {
    console.log("Database connection established..");

 const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server is successfully listening on port ${PORT}`);
});

})
.catch(() => {
    console.log("Database cannot be connected");
});
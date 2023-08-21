const express = require("express")
const {connection} = require("./db")
require("dotenv").config()
const { userRouter} = require("./routes/user");
const{appointmentRouter}=require("./routes/dashboard")
const{authenticate}=require("./middleware/athenticate")
const app = express();
const cookieParser=require("cookie-parser");
const cors=require("cors")

app.use(express.json());
app.use(cors({origin:"*"}))

app.get("/", (req, res) => {
    res.send("welcome to Masai Hospital app")
})

app.use(cookieParser());;
app.use("/user", userRouter);
// app.use(authenticate)
app.use("/appointments",appointmentRouter);
// app.use("/dashboard",dashboardRouter);

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected with food database....")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at port ${process.env.port}....`)
})

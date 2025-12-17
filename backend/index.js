import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import Dotenv from "dotenv";
import connectDB from "./utiles/db.js";
import userRouts from "./routs/user.routs.js"
import companyRout from "./routs/company.routs.js"
import jobRoute from "./routs/job.rout.js"
import applicationRoute from "./routs/application.routs.js"

//mongodb connect karnne k liye
Dotenv.config()

const PORT= process.env.PORT||8000;
console.log(PORT)

const app= express();




//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
    origin:"http://localhost:5173",
    credentials:true
}

app.use(cors(corsOption))
// app.use(cors())
// app.options('*',cors(corsOption))





//api,s

app.use("/api/v1/user",userRouts)
app.use("/api/v1/company",companyRout)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.get("/",(req,res)=>{
  res.send("server is running")
})

app.listen(PORT,
   async()=>{
    try {
     await connectDB()
    console.log(`listing to port ${PORT}`)
    } catch (error) {
      console.log("mongodb error",error)
    } 
   }
)
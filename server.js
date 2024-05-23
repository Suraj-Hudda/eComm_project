/**
 * this will be the starting file of project
 */

const express=require("express")
const mongoose=require("mongoose")
const app=express()
const server_config=require("./configrations/server.configration")
const db_config=require("./configrations/db.configration")
const user_model=require("./models/user.model")
const bcrypt=require("bcryptjs")

app.use(express.json())

/**
 * Create an Admin user at starting of application
 * if not present
 */

// connect with mongodb
mongoose.connect(db_config.DB_URL)

const db=mongoose.connection

db.on("error",()=>{
    console.log("Error while connecting to the mongodb")
})
db.once("open",()=>{
    console.log("connected to mongodb")
    init()
})
async function init(){
    try{
    let user=await user_model.findOne({userId:"admin"})
    if(user){
        console.log("admin already is present")
        return
    }
    }catch(err){
        console.log("error while reading the data",err)
    }

    try{
        user=await user_model.create({
            name:"Suraj hudda",
            userId:"admin",
            email:"surajhudda17@gmail.com",
            usertype:"ADMIN",
            password:bcrypt.hashSync("Welcome1",8)
        })
        console.log("admin created",user)

    }catch(err){
        console.log("error while creating admin",err)
    }
}
/**
 * stich the route to the server
 */
require("./routes/auth.route")(app)
/**
 * start the server
 */
app.listen(server_config.PORT,()=>{
    console.log("server started at port num:",server_config.port)
})

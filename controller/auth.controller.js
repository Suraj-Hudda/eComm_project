/**
 * I need to write the controller / logic to register the user
 */
const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
exports.signup=async(req,res)=>{
    /**
     * logic to register the user
     */
    // 1. read the requested body
    const request_body=req.body

    // 2. Insert the data in users collection in mongodb
    const userObj={
        name:request_body.name,
        user_id:request_body.user_id,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
    }
    try{
         const user_created=await user_model.created(userObj)
        //  return this user 
        res.status(201).send(user_created)

    }catch(err){
        console.log("error while registering the user",err)
        res.status(500).send({
            messege:"some error happened while registering the user"
        })
    }
    // 3. Return the response back to the user
}
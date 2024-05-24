/**
 * I need to write the controller / logic to register the user
 */
const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret=require("../configrations/auth.config")
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
        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            CreatedAt:user_created.CreatedAt,
            updatedAt:user_created.updatedAt
        }
        res.status(201).send(user_created)

    }catch(err){
        console.log("error while registering the user",err)
        res.status(500).send({
            messege:"some error happened while registering the user"
        })
    }
    // 3. Return the response back to the user
}
    exports.signup=async (req,res)=>{
        // check if the user id is present in the system
        const user=await user_model.findOne({userId:req.body.userId})
        if(user==null){
           return res.status(400).send({
                messege:"user id passed is not a valid user id"
            })
        }
        // password is correct
        isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
        if(!isPasswordValid){
           return res.status(401).send({
                messege:"password is incorrect"
            })
        }
        // using jwt we will create the access token with a given TTL and return
        const token=jwt.sign({id:user.userId},secret.secret,{
            expiresIn:120,
        })

        res.status(200).send({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            accessToken:token
        })
    }
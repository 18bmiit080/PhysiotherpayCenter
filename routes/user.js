const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const gravator = require('gravatar');


const {check,validationResult} = require('express-validator');

router.post('/',(req,res)=>res.send("User Router"));

router.post('/addUser',[
    check('name',"Name is required").not().isEmpty(),
    check('address',"Address is required").not().isEmpty(),
    check('gender',"Gender is required").not().isEmpty(),
    check('contact_no',"Contact number is required").isMobilePhone(),
    check('email', 'Please Include a valid e-mail').isEmail(),
    check('password', 'Password must be minimum 6 charactors').isLength({ min: 6 })
], async (req,res)=>{

     const errors = validationResult(req);
     if(!errors.isEmpty())
     {
         console.log("Validation error");
         return res.status(400).json({errors:errors.array()});
     }

    try{
        const {name,address,gender,contact_no,email,password,role,profile} = req.body;

        const user = new User({
            name,address,gender,contact_no,email,password,role,profile
        });

        user.name = name;
        user.address = address;
        user.gender = gender;
        user.contact_no = contact_no;
        user.email = email;
        user.password = password;
        user.role = role;
        user.profile = profile;

        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password,salt);
        await user.save();
        res.status(200).send("user is saved");

    }
    catch(err)
    {
        console.log("Something is wrong");
        return res.send(err.message);
    }
    
});

router.get("/getUser",[
    check('userid',"User id is Required!!").not().isEmpty()
],async(req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty())
     {
         console.log("Validation error");
         return res.status(400).json({errors:errors.array()});
     }
    try{

        const userid = req.body.userid;

        const usermodel = await User.findById(userid);
        if(!usermodel)
        {
            console.log("User does not exists");
            return res.status(204).send("User does not exists");
        }

        return res.status(200).send(usermodel);

    }catch(err)
    {
        console.log("Something is wrong");
        return res.send(err.message);
    }
});


router.get('/getAllUser',async (req,res)=>{
    try{

        const alluser = await User.find({}); 

        if(!alluser)
        {
            console.log("No User");
            return res.status(200).send("No User");
        }

        return res.status(200).send(alluser);

    }catch(err)
    {
        console.log(err.message);
        return res.send("Internal Server Error");
    }
});


router.post('/login',[
    check('email','Email id is required').isEmail(),
    check('password',"password is required").not().isEmpty()
],async (req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty())
     {
         console.log("Validation error");
         return res.status(400).send("invalid Credentials");
     }

     try{
         const {email,password} =req.body;

         const loggedinUser =  await User.find({email:email});
         
         if(!loggedinUser)
         {
             console.log("No user with such emailid");
             return res.status(203).send("No user exists with emailid");
         }

         
         let temp = "";
         let role = "";
       //  console.log(loggedinUser);

         loggedinUser.forEach(function(abc) {
            temp=abc.password;
            role = abc.role;
         });
         console.log(temp)
         
         if(!temp.match(password))
         {
             console.log("Invalid Credential");
             return res.status(200).send("Invalid Credential");
         }
         const payload = {
            user : {
                id:loggedinUser.id
            }
        };

        jwt.sign(payload,
           config.get('jwtSecret'),
           {expiresIn:3600},
           (err,token)=>{
               if(err) throw err;
               
               console.log(token);
               return res.status(200).json(token);
           });

     }catch(err)
     {
        console.log(err.message);
        return res.send("Internal Server Error");
     }
})

module.exports = router;

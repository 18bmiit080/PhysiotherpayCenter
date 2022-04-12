const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
//const bcrypt = require('bcryptjs');
const gravator = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');
const tbldoctor = require('../models/tbldoctor');

router.post('/addDoctor',[
    check('userid',"User id is required").not().isEmpty(),
    check('degree',"degree by is requird").not().isEmpty(),
    check('achievements',"achievements is requird").not().isEmpty(),
    check('experience',"experience is required").not().isEmpty(),
    check('specialization',"specialization is required").not().isEmpty()
], async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log("Validation errors..");
        return res.send("Validation errors");
    }

    try{
        const {userid,degree,achievements,experience,specialization,date_of_join} = req.body;
        const user = await User.findById(userid);

        if(!user)
        {
            console.log("User does not exists..");
            return res.send("User does not exists..");
        }

        const doctor = new tbldoctor({
            User,degree,achievements,experience,specialization,date_of_join
        });

        doctor.User = user;
        doctor.degree = degree;
        doctor.achievements = achievements;
        doctor.experience = experience;
        doctor.specialization = specialization;
        doctor.date_of_join = date_of_join;
        

        await doctor.save();

        console.log("Doctor has been saved");
        return res.status(200).send("Doctor has been saved");
    }
    catch(err)
    {
        console.log(err.message);
        return res.send("Internal Server Error");
    }
});


router.get("/getDoctor",[auth,[
    check('doctorid',"Doctor id is Required!!").not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty())
     {
         console.log("Validation error");
         return res.status(400).json({errors:errors.array()});
     }
    try{

        const doctorid = req.body.doctorid;

        const doctormodel = await tbldoctor.findById(doctorid).populate("User");
        if(!doctormodel)
        {
            console.log("Doctor does not exists");
            return res.status(204).send("Doctor does not exists");
        }

        return res.status(200).send(doctormodel);

    }catch(err)
    {
        console.log("Something is wrong");
        return res.send(err.message);
    }
});




router.get('/getAllDoctor',auth,async (req,res)=>{
    try{

        const alldoctor = await tbldoctor.find({}).populate('User'); 

        if(!alldoctor)
        {
            console.log("No Doctor");
            return res.status(200).send("No Doctor");
        }

        return res.status(200).send(alldoctor);

    }catch(err)
    {
        console.log(err.message);
        return res.send("Internal Server Error");
    }
});

router.delete("/deleteDoctor",[
    check('doctorid',"Doctor ID is required").not().isEmpty()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.message);
        return res.status(400).json({errors:errors.array()});
    }

    try{
        const deleteddoctorid = req.body.doctorid;

        const deletedUser = await tbldoctor.findById(deleteddoctorid);
        if(!deletedUser)
        {
            console.log("User does not exists");
            return res.status(400).send("User does not exist");
        }

        await tbldoctor.findByIdAndRemove(deletedUser._id);
        await User.findByIdAndRemove(deletedUser.User._id);


        return res.status(200).send("Doctor has been deleted");
    }
    catch(err)
    {
        console.log("Something is wrong");
        return res.send(err.message);
    }
});

module.exports = router;
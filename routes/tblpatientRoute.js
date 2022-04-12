const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
//const bcrypt = require('bcryptjs');
const gravator = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const tblpatient = require('../models/tblpatient');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/addPatient',[
    check('userid',"User id is required").not().isEmpty(),
    check('reference_by',"reference by is requird").not().isEmpty(),
    check('medical_condtition',"medical condition is requird").not().isEmpty(),
    check('occupation',"occupation is required").not().isEmpty()
], async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log("Validation errors..");
        return res.send("Validation errors");
    }

    try{
        const {userid,reference_by,medical_condtition,occupation} = req.body;
        const user = await User.findById(userid);

        if(!user)
        {
            console.log("User does not exists..");
            return res.send("User does not exists..");
        }

        const patient = new tblpatient({
            User,reference_by,medical_condtition,occupation
        });

        patient.User = user;
        patient.reference_by = reference_by;
        patient.medical_condtition = medical_condtition;
        patient.occupation = occupation;
        

        await patient.save();

        console.log("Patient has been saved");
        return res.status(200).send("Patient has been saved");
    }
    catch(err)
    {
        console.log(err.message);
        return res.send("Internal Server Error");
    }
});


router.get("/getPatient",[auth,[
    check('patientid',"Patient id is Required!!").not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty())
     {
         console.log("Validation error");
         return res.status(400).json({errors:errors.array()});
     }
    try{

        const patientid = req.body.patientid;

        const patientmodel = await tblpatient.findById(patientid).populate("User");
        if(!patientmodel)
        {
            console.log("Patient does not exists");
            return res.status(204).send("Patient does not exists");
        }

        return res.status(200).send(patientmodel);

    }catch(err)
    {
        console.log("Something is wrong");
        return res.send(err.message);
    }
});




router.get('/getAllPatient',auth,async (req,res)=>{
    try{

        const allpatient = await tblpatient.find({}).populate('User'); 

        if(!allpatient)
        {
            console.log("No Patient");
            return res.status(200).send("No Patient");
        }

        return res.status(200).send(allpatient);

    }catch(err)
    {
        console.log(err.message);
        return res.send("Internal Server Error");
    }
});

router.delete("/deletePatient",[
    check('patientid',"Patient ID is required").not().isEmpty()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.message);
        return res.status(400).json({errors:errors.array()});
    }

    try{
        const deletedpatientid = req.body.patientid;

        const deletedUser = await tblpatient.findById(deletedpatientid);
        if(!deletedUser)
        {
            console.log("User does not exists");
            return res.status(400).send("User does not exist");
        }

        await tblpatient.findByIdAndRemove(deletedUser._id);
        await User.findByIdAndRemove(deletedUser.User._id);


        return res.status(200).send("Patient has been deleted");
    }
    catch(err)
    {
        console.log("Something is wrong");
        return res.send(err.message);
    }
});

module.exports = router;
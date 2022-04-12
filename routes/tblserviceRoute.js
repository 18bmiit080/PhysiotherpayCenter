const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravator = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const tblservice = require('../models/tblservice');

//@route  POST api/tblserviceRoute
//@desc Machine Service
//@access Public

router.post('/addService',[
    check('Machine_name',"Machine Name is required").not().isEmpty(),
    check('Description',"Description is required").not().isEmpty(),
    check('Price',"Price is required").not().isEmpty(),
    
], async (req,res)=>{

     const errors = validationResult(req);
     if(!errors.isEmpty())
     {
         console.log("Validation error");
         return res.status(400).json({errors:errors.array()});
     }

    try{
        const {Machine_name,Description,Price,machine_image} = req.body;

        const service = new tblservice({
            Machine_name,Description,Price,machine_image
        });

        service.Machine_name = Machine_name;
        service.Description= Description;
        service.Price = Price;
        service.machine_image = machine_image;
        

        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password,salt);
        await service.save();
        res.status(200).send("Machine Service is saved");

    }
    catch(err)
    {
        console.log("Something is wrong");
        return res.send(err.message);
    }
    
});

router.get("/getService",[
    check('serviceid',"Service id is Required!!").not().isEmpty()
],async(req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty())
     {
         console.log("Validation error");
         return res.status(400).json({errors:errors.array()});
     }
    try{

        const serviceid = req.body.serviceid;

        const servicemodel = await tblservice.findById(serviceid);
        if(!servicemodel)
        {
            console.log("Service does not exists");
            return res.status(204).send("Service does not exists");
        }

        return res.status(200).send(servicemodel);

    }catch(err)
    {
        console.log("Something is wrong");
        return res.send(err.message);
    }
});


router.get('/getAllService',async (req,res)=>{
    try{

        const allservice = await tblservice.find({}); 

        if(!allservice)
        {
            console.log("No Service");
            return res.status(200).send("No Service");
        }

        return res.status(200).send(allservice);

    }catch(err)
    {
        console.log(err.message);
        return res.send("Internal Server Error");
    }
});

// router.delete("/deleteService",[
//     check('serviceid',"Service ID is required").not().isEmpty()
// ],async (req,res)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty())
//     {
//         console.log(errors.message);
//         return res.status(400).json({errors:errors.array()});
//     }

//     try{
//         const deletedserviceid = req.body.serviceid;

//         const deletedService = await tblservice.findById(deletedserviceid);
//         if(!deletedService)
//         {
//             console.log("Service does not exists");
//             return res.status(400).send("Service does not exist");
//         }

//         await tblservice.findByIdAndRemove(deletedService._id);
//         //await User.findByIdAndRemove(deletedUser.User._id);


//         return res.status(200).send("Service has been deleted");
//     }
//     catch(err)
//     {
//         console.log("Something is wrong");
//         return res.send(err.message);
//     }
// });

 module.exports = router;
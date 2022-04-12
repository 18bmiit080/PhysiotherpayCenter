const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravator = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const tblappointment = require('../models/tblappointment');
const tblpatient = require('../models/tblpatient');
const tbldoctor = require('../models/tbldoctor');

router.post('/addappointment',[
check('patientid',"patientid is required").not().isEmpty(),
check('time',"time is required").not().isEmpty(),
check('date',"Date is required").not().isEmpty(),
check('doctorid',"doctorid is required").not().isEmpty(),
check('status',"status is required").not().isEmpty(),
check('serviceid',"serviceid is required").not().isEmpty(),
check('price',"price is required").not().isEmpty(),
check('chief_problem',"problem is required").not().isEmpty()
], async(req,res)=>{

const errors = validationResult(req);
if(!errors.isEmpty())
{
    console.log(errors.message);
    return res.send("Validation errors");
}

try{
    const {patientid,time,date,doctorid,status,serviceid,price,chief_problem} = req.body;
    const facultyid = req.body.Publishby;
    const faculty = await Faculty.findById(facultyid);

    if(!faculty)
    {
        console.log(errors.message);
        return res.send("Faculty does not exists..");
    }
    

    const examschedule = new Examschedule({
        sem,subject,ExamDate,FromTime,Totime,facultyid,papar
    });

    examschedule.sem = sem;
    examschedule.subject = subject;
    examschedule.ExamDate = ExamDate;
    examschedule.FromTime = convertFromStringToDate("0000-00-00T"+FromTime);
    examschedule.Totime = convertFromStringToDate("0000-00-00T"+Totime);
    examschedule.Publishby = facultyid;
    examschedule.papar = papar;


    await examschedule.save();

    console.log("Examschedule has been saved");
    return res.status(200).send("Examschedule has been saved");
}
catch(err)
{
    console.log(err.message);
    return res.send("Internal Server Error");
}
});


router.get("/getExam",[
check('examid',"Exam id is Required!!").not().isEmpty()
],async(req,res)=>{
const errors = validationResult(req);
 if(!errors.isEmpty())
 {
     console.log("Validation error");
     return res.status(400).json({errors:errors.array()});
 }
try{

    const examid = req.body.examid;

    const Exammodel = await Examschedule.findById(examid);
    if(!Exammodel)
    {
        console.log("Exam does not exists");
        return res.status(204).send("Exam does not exists");
    }

    return res.status(200).send(Exammodel);

}catch(err)
{
    console.log("Something is wrong");
    return res.send(err.message);
}
});

router.get('/getAllexam',async (req,res)=>{
try{

    const allexam = await Examschedule.find({}).populate('Publishby'); 

    if(!allexam)
    {
        console.log(errors.message);
        return res.status(200).send("No Exam");
    }

    return res.status(200).send(allexam);

}catch(err)
{
    console.log(err.message);
    return res.send("Internal Server Error");
}
});

function convertFromStringToDate(responseDate)
{
let dateComponents = responseDate.split('T');
let datepieces = dateComponents[0].split('-');
let timePieces = dateComponents[1].split(':');

return (new Date(datepieces[2],(datepieces[1]-1),datepieces[0],timePieces[0],timePieces[1],timePieces[2]))
}

module.exports = router;

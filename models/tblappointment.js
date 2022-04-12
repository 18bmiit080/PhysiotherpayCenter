const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientid : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'tblpatient',
        required : true
    },
    time : {
        type: Date,
        required : true
    },
    date : {
        type : Date,
        required : true
       
    },
    doctorid : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'tbldoctor',
        required : true
    },
    status : {
        type : String,
        required :true
    },
    serviceid : {
        type : [mongoose.Schema.Types.ObjectId],
        ref :'tblservice'
    },
    price : {
        type : String,
        required : true
    },
    chief_problem : {
        type : String,
        required : true
    }

});

module.exports = tblappointment = mongoose.model('tblappointment',AppointmentSchema); 
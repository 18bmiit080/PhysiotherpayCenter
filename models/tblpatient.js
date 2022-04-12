const mongoose = require('mongoose');

const UserPatientSchema = new mongoose.Schema({
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'User',
        required : true 
    },
    
    reference_by : {
        type: String,
        required: true
    },
    
    medical_condtition : {
        type : String,
        required : true
    },
    occupation : {
        type : String,
        required : true
    }

    

});

module.exports = tblpatient = mongoose.model('tblpatient',UserPatientSchema);
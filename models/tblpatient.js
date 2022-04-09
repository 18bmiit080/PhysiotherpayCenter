const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    pname : {
        type: String,
        required: true  
    },
    address : {
        type: String,
        required: true  
    },
    gender : {
        type : String,
        required: true
    },
    contact_no : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required: true
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
    },

    password : {
        type: String,
        required: true
    },

    otp : {
        type: String,
    },
});

module.exports = User = mongoose.model('tblpatient',UserSchema);
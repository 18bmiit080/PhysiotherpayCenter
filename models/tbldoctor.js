const mongoose = require('mongoose');

const UserDoctorSchema = new mongoose.Schema({
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'User',
        required : true 
    },

    degree : {
        type: String,
        required: true
    },
    
    achievements : {
        type : String,
        required : true
    },
    experience : {
        type : String,
        required : true
    },

    specialization : {
        type: String,
        required: true
    },

    date_of_join : {
        type: Date,
        default: Date.now
    }
});

module.exports = tbldoctor = mongoose.model('tbldoctor', UserDoctorSchema);
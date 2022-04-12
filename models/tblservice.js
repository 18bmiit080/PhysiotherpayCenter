const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    Machine_name : {
        type: String,
        required: true
    },
    Description : {
        type: String,
        required: true
    },
    Price : {
        type : String,
        required: true  
    },
    machine_image : {
        type : String,

    }

});

module.exports = tblservice = mongoose.model('tblservice',ServiceSchema); 
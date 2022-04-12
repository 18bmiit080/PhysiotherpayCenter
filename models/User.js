const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
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
        required : true,
    
    },
    email : {
        type: String,
        required: true,

    },
    
    password : {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "1"
    },

    profile : {
        type: String
    }
});

module.exports = User = mongoose.model("User", UserSchema);
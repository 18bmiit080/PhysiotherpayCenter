const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const config = require('config');
const gravator = require('gravatar');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");


/*
    Route   :     /api/auth/me
    Request :     get
    Access  :     Private
*/

router.get('/me',auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err)
    {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});




module.exports = router;
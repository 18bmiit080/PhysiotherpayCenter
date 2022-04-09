const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const gravator = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../model/User');


router.post('/', [
    check('email', 'Include a valid e-mail').isEmail(),
    check('password', 'Password muast be minimum 6 charactors').isLength({ min: 6 })
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const { pname,address,gender,contact_no,email,reference_by, medical_condtition,occupation,password,otp} = req.body;

        try {
            let user = await User.findOne({ email });

            if (user)
            {
                res.status(400).json({errors: [{msg: 'Users already exists'}] });
            }


           
            user = new User({
                pname,
                address,
                gender,
                contact_no,
                email,
                reference_by,
                medical_condtition,
                occupation,
                password,
                otp
            });

            

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);
            await user.save();

            const payload = {
                user:{
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'),
            {expiresIn: 360000},
            (err,token)=>{
               // if(err)throw err;
                  return  res.json({token});
            });

           
        } catch (error) {
           console.error(error.message);
           res.status(500).send('Server error....'); 
        }
    }
    
});

router.get('/up',async (req,res) => {
    try {
        const users = await User.find();
             
            return res.json(users)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }});
module.exports=router;
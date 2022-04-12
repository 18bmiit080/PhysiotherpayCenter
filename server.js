const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000 ;

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));
app.listen(PORT,() => console.log(`server started on port ${PORT}`));
app.get('/',(req,res) => res.send("API Running"));


//Define Routes
 app.use('/api/user',require('./routes/user'));
 app.use('/api/tblpatientRoute',require('./routes/tblpatientRoute'));
 app.use('/api/tbldoctorRoute',require('./routes/tbldoctorRoute'));
 app.use('/api/auth',require('./routes/auth'));
 app.use('/api/tblserviceRoute',require('./routes/tblserviceRoute'));

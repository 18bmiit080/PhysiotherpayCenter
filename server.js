const express = require('express');
//const connectDB = require('./config/db');

const app = express();

//const Patient=require('./routes/tblpatient');

//Connect Database


//Init Middleware
//app.use(express.json({extended: false}));
app.get('/',(req,res) => res.send("API Running"));

//Define Routes
 //app.post('/api/tblpatient',require('./routes/tblpatientRoute'));

const PORT = process.env.PORT || 5000 ;

app.listen(PORT,() => console.log(`server started on port ${PORT}`));
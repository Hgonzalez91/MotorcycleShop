const mongoose = require("mongoose") ;
require('dotenv').config();

//MongoDB ATLAS CONNECTION
mongoose
.connect(process.env.MONGOOSE_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error(err))
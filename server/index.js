const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const movieRouter = require('./routers/movieRouter');

var cors = require('cors')

dotenv.config();
connectDB();

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use('/api',movieRouter);

const PORT = process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
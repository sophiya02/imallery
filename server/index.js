const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connect');
const imagesRouter = require('./routes/images')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('../src'))
// app.use('/api/v1/auth', authRouter)
// app.use('/api/v1/images', authenticateUser, imagesRouter)
app.use('/api/v1/images', imagesRouter)


const port= process.env.PORT | 3000;

const connect = async () =>{
  try{
    await connectDb(process.env.MONGO_URI);
    app.listen(port, ()=>{
      console.log(`server listening on port ${port}`)
    });
  }
  catch(err){
    console.log("err in db connection:", err)
  }
}

connect();

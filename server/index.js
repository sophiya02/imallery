const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
console.log("hello");
app.use(express.static('../src'))
const port= process.env.PORT | 5000;

app.listen(port, ()=>{
  console.log(`server listening on port ${port}`)
});

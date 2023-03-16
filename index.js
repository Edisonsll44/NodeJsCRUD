const express = require('express')
const cors = require("cors");
const routerApi = require('./routers');
const jsonHandler = require("./middleware/json.handler")
const {logError, errorHandler, boomErrorHandler} = require("./middleware/error.handler")


const app = express()
const port = 3001;

jsonHandler(app);

const whiteList = ["http://localhost:3001","http://127.0.0.1:5500", "https://localhost:3001"];
const options = {
  origin : (origin, callback) => {
    console.log(origin);
    if(whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
}

app.use(cors(options));

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get("/",(req,res)=>{
  res.send("Hola desde mi servidor de express");
});

routerApi(app);

app.listen(port,()=>{
  console.log("Mi port " + port);
});


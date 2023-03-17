const express = require('express')
const corsConfigure = require("./middleware/cors")
const routerApi = require('./routers');
const jsonHandler = require("./middleware/json.handler")
const {logError, errorHandler, boomErrorHandler} = require("./middleware/error.handler")
const {cors} = require("./configuration/config");

const app = express()
const port = 3001;

const freeAccess =  cors.freeAccess == "true";

jsonHandler(app);
corsConfigure(app,freeAccess);

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


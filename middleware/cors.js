const cors = require("cors");

const whiteList = ["http://localhost:30001","http://127.0.0.1:5500", "https://localhost:30001"];

function corsConfigure(app, freeAccess) {
  if(freeAccess) {
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
  } else {
    app.use(cors());
  }
}

module.exports = corsConfigure;

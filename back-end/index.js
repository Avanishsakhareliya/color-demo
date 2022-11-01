const express = require("express");
const app = express();
require("./src/Connection/connection")
const color_router =require("./src/router/color_router")
app.use(express.json())
let cors = require('cors')
app.use(cors())


app.use("/api/v1/",color_router);


app.listen(process.env.PORT||9090,()=>{
    console.log("Port is listing at 9090")
})
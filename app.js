require("dotenv").config();
const express = require("express");
const app = express();
const clientsRouter = require("./routes/clientsRoute");
const { addClientValidation } = require('./validation/clients/validationClient')

app.use(express.json());
app.use("/api/clients",addClientValidation,clientsRouter);


app.listen(process.env.APP_PORT,()=>{
    console.log("Server is running ON PORT: ",process.env.APP_PORT);
});
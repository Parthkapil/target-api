import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
require("dotenv").config(); // for importing .env file

//create express app
const app = express();

//apply middleware
app.use(cors());
// This line is really important if we dont have this then we won't be able to access req.body
app.use(express.json({ limit: "5mb" })); // So that we can recieve files upto 5mb in our requests

//routes
//This is a clever soution with which we do not need to import each
//route individually it will automatically import the rout for us.
// we are prefixing each route with api. to call anyt route in URL we have to write api/route
readdirSync("./routes").map(r => app.use("/target-api", require(`./routes/${r}`)));

//read port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running at port ${port}`));

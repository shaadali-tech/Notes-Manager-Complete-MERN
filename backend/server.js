const express = require("express");
const dbconnection = require("./config/db");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoute");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", noteRoutes);
dbconnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("App Started listnening");
    });
  })
  .catch((err) => {
    console.log(err);
  });

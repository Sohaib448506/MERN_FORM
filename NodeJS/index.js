const mongoose = require("mongoose");
const express = require("express");
const { URL } = require("./config/index");

const { formDB, port } = require("./config/index");

const userRoute = require("./routes/index");
const app = express();
app.use(express.json());
mongoose
  .connect(`mongodb://${URL}/${formDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB", err));

app.use("/api", userRoute);

app.listen(port, () => console.log(`Listening on port ${port}...`));

const express = require("express");
const { connectDatabase } = require("./database/databse");

const app = express();

// Tell NODE TO USE DOTENV
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES HERE
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute")

// DATABASE CONNECTION
connectDatabase(process.env.MONGO_URL);

//API to check if server is live or not
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is live",
  });
});

app.use("/api",authRoute)
app.use("/api",productRoute)

// listen server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server has started at PORT ${PORT}`);
});

require("dotenv").config();
const path = require('path');
const express = require("express");
const app = express();
const cors = require("cors");
const corsOption = require("../config/corsConfig");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;

const connectDb = async () => {
 try {
  await mongoose.connect(process.env.DATABASE_URI);
 } catch (err) {
  console.log(err);
 }
};

connectDb();

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false })); // for form data
app.use(express.json());

app.use("/", require("../routes/root"));

app.all("*", (req, res) => {
 res.status(404);

 if (req.accepts("html")) {
  res.sendFile(path.join(__dirname, "views", "404.html"));
 } else if (req.accepts("json")) {
  res.json({ error: "404 not found!" });
 } else {
  res.type("txt").send("404 not found!");
 }
});

mongoose.connection.once("open", () => {
 console.log("connected to mongodb!");
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// const fs = require("fs");
// const News = require("./model/News");

// fs.readdir(path.join(__dirname, "toupload"), "utf-8", async (err, files) => {
//  const promises = [];
//  files.forEach(file => {
//   fs.readFile(path.join(__dirname, "toupload", file), "utf-8", (err, content) => {
//    promises.push(News.create(JSON.parse(content).data));
//   });
//  });
//  await Promise.all(promises);
//  console.log("Upload successful!");
// });
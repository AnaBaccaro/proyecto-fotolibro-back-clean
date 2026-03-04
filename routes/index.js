const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/img", express.static(path.join(__dirname, "img")));

const photobookRoutes = require("./routes/photobookRoutes");
app.use("/fotolibros", photobookRoutes);

module.exports = app;

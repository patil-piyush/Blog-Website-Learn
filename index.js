const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.get("/", (req, res) => {
    return res.render("home");
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT - ${PORT}`);
})
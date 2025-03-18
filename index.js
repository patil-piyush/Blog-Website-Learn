const express = require('express');
const ejs = require('ejs');
const path = require('path');
const userRoute = require('./routes/user');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/blogify').then(() => { console.log("mongodb connected") });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
    return res.render("home");
})


app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT - ${PORT}`);
})
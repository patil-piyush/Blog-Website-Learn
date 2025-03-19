const express = require('express');
const ejs = require('ejs');
const path = require('path');
const userRoute = require('./routes/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/blogify').then(() => { console.log("mongodb connected") });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


app.get("/", (req, res) => {
    return res.render("home",{
        user: req.user,
    });
});


app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT - ${PORT}`);
});
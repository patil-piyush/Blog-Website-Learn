const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');


const Blog = require('./models/blog');

const app = express();
const PORT = 3000;

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

mongoose.connect('mongodb://localhost:27017/blogify').then(() => { console.log("mongodb connected") });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));


app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    return res.render("home",{
        blogs: allBlogs,
        user: req.user,
    });
});



app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT - ${PORT}`);
});
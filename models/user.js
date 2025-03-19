const { Schema, model } = require('mongoose');
const crypto = require('crypto');
const { 
    createTokenForUser,
    validateToken
} = require('../services/authentication')


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "../public/images/default.jpg",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, { timestamps: true });


userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User Not Found!!');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = crypto.createHmac("sha256", salt).update(password).digest("hex");

    if (userProvidedHash !== hashedPassword)
        throw new Error("Incorrect password!!");

    const token = createTokenForUser(user);
    return token
});


//middleware for crypting the password using salt
userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = crypto.randomBytes(16).toString();
    const hashedPassword = crypto.createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

const User = model("user", userSchema);

module.exports = User;
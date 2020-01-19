const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    coords: {
        type: Object,
        required: true
    }
});

// module.exports = users = mongoose.model("user", UserSchema);
module.exports = mongoose.model("User", UserSchema);
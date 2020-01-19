const express = require("express");
const User = require("./models/User");
const mongoose = require("mongoose"); //using mongoose to make life easier
const cors = require("cors");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://admin:admin@cluster0-jsulc.mongodb.net/test?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        );

        console.log("db connected");
    } catch (error) {
        console.log(error.message);
    }
};
connectDB();

const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json({ extended: false }));


app.post("/register", async (req, res) => {
    console.log('************************');
    console.log(req.body);
    let { firstName, lastName, password, gender, email, phone, country, lat, lng } = req.body;
//     if (!email || !firstName ||
//         !lastName || !password ||
//         !gender || !phone || !country) {
//         return res.status(400).json("incorrect form submission");
//     }
    const name = firstName + " " + lastName;
    const coords = {
        lat, lng
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.json({ errors: [{ msg: "user already exists" }] });
        }
        user = new User({
            name,
            email,
            password,
            phone,
            country,
            coords,
            gender
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

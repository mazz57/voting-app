const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    adhaarNO: Number,
    
});

const candidateSchema = new mongoose.Schema({
    name: String,
    age: Number,
    party: String,
    votes: { type: Number, default: 0 },
});

const userModel = mongoose.model("user" , userSchema);
const candidateModel = mongoose.model("candidate" , candidateSchema);

module.exports = {
    User,
    Candidate
};


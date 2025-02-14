const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    adhaarNO: {type: Number, unique: true},
    hasvoted : { type:Boolean, default:false}
});

const candidateSchema = new mongoose.Schema({
    name: String,
    age: Number,
    party: String,
    voteCount: { type: Number, default: 0 },
});

const adminSchema = new mongoose.Schema({
    adminID: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
});

const userModel = mongoose.model("user" , userSchema);
const candidateModel = mongoose.model("candidate" , candidateSchema);
const adminModel = mongoose.model("admin" , adminSchema);       
module.exports = {
    userModel,
    candidateModel,
    adminModel
};


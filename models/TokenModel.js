const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    token: String,
});

module.exports = mongoose.model('Token', TokenSchema);
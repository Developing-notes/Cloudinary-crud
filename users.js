const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    cloudinary_id: {
        type: String
    }

})
module.exports = mongoose.model('User', userschema)
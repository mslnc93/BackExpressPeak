const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    pseudo : {type : 'string', required: true},
    email : {type : 'string', required: true},
    message : {type : 'string', required: true},
})

module.exports = mongoose.model('Contact', contactSchema);
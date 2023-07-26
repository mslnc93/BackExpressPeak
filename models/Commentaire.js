const mongoose = require('mongoose')


const commentaireSchema = mongoose.Schema({
    userId : {type : 'number', required: true},
    message : { type:'string', required: true},
    date : {type: 'Date', default: Date.now()}
})


module.exports = mongoose.model('Commentaire', commentaireSchema);
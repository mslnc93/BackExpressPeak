const mongoose = require('mongoose')

// const commentaireSchema = mongoose.Schema({

//     userId : {type : 'number', required: true},
//     message : { type:'string', required: true},
//     date : {type: 'Date', default: Date.now()}
// })

const postSchema = mongoose.Schema({
    titre : {type : 'string', required: true},
    resume : {type : 'string', required: true},
    contenu : {type : 'string', required: true},
    imagenom : {type : 'string', required: true},
    // commentaires: [commentaireSchema],
})

module.exports = mongoose.model('Post', postSchema);
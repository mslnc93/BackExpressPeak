const mongoose = require('mongoose')

const commentaires = mongoose.Schema({

    userId : {type : 'number', required: true},
    message : { type:'string', required: true},

})

const postSchema = mongoose.Schema({
    titre : {type : 'string', required: true},
    resume : {type : 'string', required: true},
    contenu : {type : 'string', required: true},
    imagenom : {type : 'string', required: true},
    commentaires: [{ type: commentaires }],
})

module.exports = mongoose.model('Post', postSchema);
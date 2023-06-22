const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    sujet : {type : 'string', required: true},
    description : {type : 'string', required: true},
    imageName : {type : 'string', required: true},
    commentaires: { type: 'string' },
})

module.exports = mongoose.model('Post', postSchema);
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    nom : {type : 'string', required: true},
    categorie : {type : 'string', required: true},
    prix : {type : 'number', required: true},
    description : {type : 'string'},
    stock : {type : 'number', required: true},

})

module.exports = mongoose.model('Product', productSchema);
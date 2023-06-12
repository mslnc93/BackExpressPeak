var express = require('express');

var app = express();

var path = require('path');

//BodyParser

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

require('dotenv').config();

//MongoDB

var mongoose = require('mongoose');


const User = require('./models/User');

const Product = require('./models/Product');

const url = process.env.DATABASE_URL

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
}))


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("MongoDB connected !"))
    .catch(err => console.log(err))



//Method Override

const methodOverride = require('method-override');
const { cpSync } = require('fs');
app.use(methodOverride('_method'));

const bcrypt = require('bcrypt');


//SIGNIN

app.get('/inscription', function (req, res) {
    // res.render('Signin')
    res.json(data);
});

app.post('/api/inscription', function (req, res) {
    const Data = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        num: req.body.num,
        mdp: bcrypt.hashSync(req.body.mdp, 10),
        admin: false,

    })
    Data.save()
        .then((data) => {
            console.log('User saved !');
            res.redirect('/accueil')
        })
        .catch(err => console.log(err));
});



//LOGIN

app.get('/connexion', function (req, res) {
    res.render('Login');
});

app.post('/api/login', function (req, res) {
    User.findOne({
        id: req.body.id
    }).then((user) => {
        if (!user) {
            res.send('Aucun utilisateur trouvé')
        }


        if (!bcrypt.compareSync(req.body.mdp, user.mdp)) {

            res.send("Mot de passe incorrect")
        }

        res.redirect('/produits')

    }).catch((error) => { console.log(error) });
})


//PRODUIT



app.get('/produits', function (req, res) {
    Product.find().then((data) => {
        // res.render('Product', { data: data });
        res.json(data);
    })
        .catch(err => console.log(err));
})



//NOUVEAU PRODUIT

app.get('/nouveauproduit', (req, res) => {
    res.render('NewProduct');
});

app.post('/api/submit-product', function (req, res) {
    const Data = new Product({
        nom: req.body.nom,
        categorie: req.body.categorie,
        prix: req.body.prix,
        description: req.body.description,
        stock: req.body.stock,
    })
    Data.save().then(() => {
        console.log("Data enregistrée avec succès.")
        res.redirect('/produits')
    }).catch(err => {
        console.log(err)
    })
})


//EDITER ET SUPPRIMER

app.get('/product/:id', function (req, res) {
    Product.findOne({ _id: req.params.id })
        .then((data) => {
            console.log(data);
            res.render('EditProduct', { data: data });
        })
        .catch(err => console.log(err));
});


app.put('/product/edit/:id', function (req, res) {
    const Data = ({
        nom: req.body.nom,
        categorie: req.body.categorie,
        prix: req.body.prix,
        description: req.body.description,
        stock: req.body.stock
    })

    Product.updateOne({ _id: req.params.id }, { $set: Data })
        .then(() => {
            res.redirect('/produits')
        })
        .catch(err => console.log(err));
});

app.delete('/product/delete/:id', function (req, res) {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.redirect('/produits')
        })
        .catch(err => console.log(err));
});














var server = app.listen(5000, function () {
    console.log("server listening on port 5000")
});

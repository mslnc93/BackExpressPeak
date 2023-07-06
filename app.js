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

const Contact = require('./models/Contact');

const Post = require('./models/Post');

const url = process.env.DATABASE_URL;

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
}))


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("MongoDB connected !"))
    .catch(err => console.log(err))


// Multer pour gérer les fichiers
const multer = require('multer');
app.use(express.static('uploads'));

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

app.post('/uploads', upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).send('No file ulpoaded');
    }
    else {
        res.send('File uploaded successfull')
    }
})


//Method Override

const methodOverride = require('method-override');
const { cpSync } = require('fs');
app.use(methodOverride('_method'));

const bcrypt = require('bcrypt');



//SIGNIN

app.get('/inscription', function (req, res) {
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
            res.redirect('http://localhost:3000/accueil')
        })
        .catch(err => console.log(err));
});



//LOGIN

app.get('/connexion', function (req, res) {
    res.render('Login');
});

app.post('/api/connexion', function (req, res) {
    User.findOne({
        pseudo: req.body.pseudo
    }).then((user) => {
        if (!user) {
            res.send('Aucun utilisateur trouvé')
        }


        if (!bcrypt.compareSync(req.body.mdp, user.mdp)) {

            res.send("Mot de passe incorrect")
        }

        res.redirect('http://localhost:3000/accueil')

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


//Contactez-nous

app.get('/contact', function (req, res) {
    res.json('Contact');
});


app.post('/api/contact', function (req, res) {
    const Data = new Contact({
        pseudo: req.body.pseudo,
        email: req.body.email,
        message: req.body.message,


    })
    Data.save()
        .then((data) => {
            console.log('User saved !');
            res.redirect('http://localhost:3000/')
        })
        .catch(err => console.log(err));
});


//NOUVEAU PRODUIT

app.post('/submit-product', upload.single('file'), function (req, res) {
    const Data = new Product({
        nom: req.body.nom,
        categorie: req.body.categorie,
        prix: req.body.prix,
        imagenom: req.body.imagenom,
        description: req.body.description,
        stock: req.body.stock,
    })
    Data.save().then(() => {
        res.json('ok !');
    }).catch(err => {
        console.log(err)
    })
})

app.get('/products', function (req, res) {
    Product.find().then((data) => {
        res.json(data);
    })
        .catch(err => console.log(err));
})


// Post et commentaires 

app.post('/submit-post', upload.single('file'), function (req, res) {
    const Data = new Post({
        titre: req.body.titre,
        resume: req.body.resume,
        contenu: req.body.contenu,
        imagenom: req.body.imagenom,
    });
    Data.save()
        .then(() =>
            res.json('ok !'))
        .catch(err => console.log(err));
});

app.get('/posts', function (req, res) {
    Post.find().then((data) => {
        res.json(data);
    })
        .catch(err => console.log(err));
})

app.get('/post/:id', function (req, res) {
    console.log(req.params.id);
    Post.findone({
        _id: req.params.id
    })
        .then(data => {
            res.render('Edit', { data: data });
        })
        .catch(err => console.log(err))
});

// Edition et suppression post

app.put('/post/edit/:id', upload.single('file'), function (req, res) {
    console.log(req.params.id);
    const Data = {
        titre: req.body.titre,
        resume: req.body.resume,
        contenu: req.body.contenu,
        imagenom: req.body.imagenom,
    }
    Post.updateOne({ _id: req.params.id }, { $set: Data })
        .then(data => {
            console.log("Data updated");
            // res.redirect('http://localhost:3000/forumconseils/')
            res.json(data);
        })
        .catch(err => console.log(err));
});

app.delete('/post/delete/:id', function (req, res) {
    Post.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.redirect('http://localhost:3000/forumconseils/');
        })
        .catch(err => console.log(err))
});













var server = app.listen(5000, function () {
    console.log("server listening on port 5000")
});

const express = require('express');
const app = express();
const db = require('./models');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('HOME');
});

// INDEX - GET /albums
app.get('/albums', (req, res) => {
    db.album.findAll().then(function(albums) {
        res.json(albums);
    }).catch(err => res.send('Error'));
    // res.send('MAIN PAGE');
});

// CREATE - POST /albums (redirect to /albums/:id)
app.post('/albums', (req, res) => {
    // console.log(req.body);
    db.album.findOrCreate({
        where: {
            name: req.body.name
        },
        defaults: {
            name: req.body.name,
            releaseYear: req.body.releaseYear,
            length: req.body.length,
            label: req.body.label
        }
    }).then(function([album, created]) {
        console.log(`Successfully ${created ? 'created!' : 'found'} ${album.name} by Pink Floyd`);
        res.redirect(`/albums/${album.id}`);
    }).catch(err => res.send('Error'));
});

// SHOW - GET /albums/:id
app.get('/albums/:id', (req, res) => {
    db.album.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(album) {
        res.json(album);
    }).catch(err => res.send('Error'));
    // res.send('SHOWING PAGE for Album at ID ' + req.params.id);
});

// UPDATE - PUT /albums/:id (redirect to /albums/:id)
app.put('/albums/:id', (req, res) => {
    db.album.update({
        name: req.body.name,
        releaseYear: req.body.releaseYear,
        length: req.body.length,
        label: req.body.label
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(album) {
        res.redirect(`/albums/${req.params.id}`)
    });
    // res.send('Updated Album at ID ' + req.params.id);
});

// DESTROY - DELETE /albums/:id (redirect to /albums)
app.delete('/albums/:id', (req, res) => {
    db.album.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect(`/albums`);
    });
    // res.send('Deleted Album at ID ' + req.params.id);
});


app.listen(3000, () => console.log('You\'re listening to port 3000'));
const db = require('./models');

// Create
// db.album.create({
//     name: 'Animals',
//     releaseYear: 1977,
//     length: '41:40',
//     label: 'Harvest/Columbia'
//     // name: 'Wish You Were Here',
//     // releaseYear: 1975,
//     // length: '44:17',
//     // label: 'Harvest/Columbia'
//     // name: 'The Dark Side of the Moon',
//     // releaseYear: 1973,
//     // length: '42:32',
//     // label: 'Harvest'
// }).then(function(data) {
//     console.log(data);
// }).catch(err => console.log('Error'));

// Read ONE
db.album.findOne({
    where: {
        id: 2
    }
}).then(function(album) {
    console.log('Found album!', album.name);
}).catch(err => console.log(err));

// Find or Create
db.album.findOrCreate({
    where: {
        name: 'The Wall'
    },
    defaults: {
        name: 'The Wall',
        releaseYear: 1979,
        length: '80:42',
        label: 'Harvest/Columbia'
    }
}).then(function([album, created]) {
    if (created) {
        console.log(`Created ${album.name}`);
    } else {
        console.log(`Found ${album.name}`);
    }
}).catch(err => console.log(err));

// Read ALL
db.album.findAll().then(function(albums) {
    albums.forEach(album => console.log(album.name));
}).catch(err => console.log(err));

// Update
db.album.update({
    name: "The Dark Side of the Moon",
}, {
    where: {
        id: 1
    }
}).then(function(updated) {
    console.log(updated);
    if (updated) {
        console.log(`Successfully updated`);
    }
}).catch(err => console.log(err));

// Destroy
db.album.destroy({
    where: {
        name: 'Animals'
    }
}).then(function(numDeleted) {
    console.log('Farewell');
    console.log(numDeleted);
}).catch(err => console.log(err));
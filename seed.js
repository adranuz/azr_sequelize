const sequelize = require('./database/db');
const Post = require('./database/models/Post');
const User = require('./database/models/User');
const Address = require('./database/models/Address');
require('./database/associations');

// Usuarios
const users = [
    { name: "Anton", email: "azr@azr.es", age: 18, role: 0 },
    { name: "Pepe", email: "pepe@gmail.com", age: 38, role: 1 },
    { name: "Lucia", email: "lucia@hotmail.com", age: 88, role: 0 },
];

// Direcciones
const addresses = [
    { street: "Calle de la vida 2", residentId: 1 },
    { street: "Debajo del puente s/n", residentId: 2 },
    { street: "Isla de Tabarca, 5", residentId: 3 },
];

// Entradas
const posts = [
    { title: "Foo", body: "Bar 1", authorId: 1 },
    { title: "Foo", body: "Bar 2", authorId: 1 }, 
    { title: "Title", body: "Bar 3", authorId: 1 },
    { title: "Yo que se", body: "Bar 4", authorId: 1 }, 
    { title: "Me da igual", body: "Bar 5", authorId: 2 }, 
    { title: "Todo", body: "Bar 6", authorId: 2 }, 
    { title: "Foo", body: "Bar 7", authorId: 3 }, 
];


sequelize.sync({ force: false }).then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
}).then(() => {
    // Rellenar usuarios
    users.forEach(user => User.create(user));
}).then(() => {
    // Rellenar direcciones
    addresses.forEach(address => Address.create(address));
}).then(() => {
    // Rellenar posts
    posts.forEach(post => Post.create(post));
});
const { faker } = require('@faker-js/faker');

// génération des données

function donnees(j) {
    let users = [];
    for (let i=0; i<j; i++) {
        console.log('User number', i);
        users.push({
            id: faker.number.int({ min: 100, max: 999 }),
            name: faker.person.lastName(),
            age: faker.number.int({min:18, max:60}),
            email: faker.internet.email()
        });
    };
    return users;
}

var nb = 5;
const users = donnees(nb);
console.log("Tableau des utilisateurs :", users);

// map ()
const nomsMaj = users.map(user => user.name.toUpperCase());

// filter ()
const oldUsers = users.filter((user) => user.age > 30);

// reduce ()
const ageTotal = oldUsers.reduce((sum, user) => sum + user.age, 0);

// affichage
console.log("Les noms en majuscule :", nomsMaj);
console.log("Les utilisateurs qui ont plus de 30 ans :", oldUsers);
console.log("Le somme des âges :", ageTotal);
const { faker } = require('@faker-js/faker');


// Génération des données

const users = [];

for (i=0; i<10; i++) {
    users.push({
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.person.lastName(),
        age: faker.number.int({min:18, max:60}),
        email: faker.internet.email()
    });
};

console.log("Tableau des utilisateurs :", users);

// map ()

// filter ()

const oldUsers = users.filter((user) => user.age > 30);
console.log("Les utilisateurs qui ont plus de 30 ans :", oldUsers);

// reduce ()

const ageTotal = oldUsers.reduce(
    
);
console.log("Le somme des âges :", ageTotal);




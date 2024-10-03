//implémentation Axios
const axios = require('axios');

// /**
//  * @return {Promise<void>}
//  */
// async function log(message) {
//     console.log(message);
//     return "Done !";
// }

// // utilisation de API
// fetch('https://jsonplaceholder.typicode.com/users')
// .then(response => response.json())
// .then(async (json) => await log(json))
// .catch(error => console.log(error));

// fetch('https://jsonplaceholder.typicode.com/users')
// .then(function(response) {
//     return response.json()
// })
// .then(json => console.log(json))
// .catch(error => console.log(error));

function timer() {
    return new Promise((resolve) => {
        console.log('waiting for 1s')
        setTimeout(resolve, 1000)
    })
}

// requête GET
async function main() {
    let withErrors = false;

    try {
        await timer()
            .then(() => axios.get('https://jsonplaceholder.typicode.com/posts?id=3'))
            .then(response => response.data)
            .then(async function (data) {
                console.log('reponse received')

                await timer();
                console.log('response with await', data);

                return timer().then(() => console.log('response with then', data));
            })
            .then(() => new Promise((_, reject) => reject(new Error('Boom !'))))
            .catch(function (error) {
                withErrors = true;
                console.error('An error occured in the then/catch !', error);
                throw error;
            });
    } catch (error2) {
        console.error('An error occured in the try/catch !', error2);
    }
}


main();
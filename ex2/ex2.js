//implémentation Axios
const axios = require('axios');

async function log(message) { // always returns a promise
    console.log(message);
    return "Done!";
}

async function timer() {
    return new Promise((resolve) => {
        console.log('Timer activated - waiting for 1s')
        setTimeout(resolve, 1000)
    })
}

// utilisation de fetch
fetch('https://jsonplaceholder.typicode.com/users') // collects data from API, fetch() always returns a promise, so program goes on w/o waiting for result
    .then(response => response.json())
    .then((json) => console.log(json))

// utilisation de axios (old ver of fetch)
async function main() {
    // let withErrors = false;

    try {
        await timer() // await can only be used in async func, pauses execution of func until the promise is resolved or rejected
            .then(() => axios.get('https://jsonplaceholder.typicode.com/posts?id=3'))
            .then(response => response.data)
            .then(async function (data) { //anonymous func, for one-off usage
                console.log('Response with async');

                await timer();
                console.log('Response with await', data);

                // return timer().then(() => console.log('response with then', data));
            })
            .then(() => new Promise((_, reject) => reject(new Error('Boom !'))))
            .catch(function (error) {
                // withErrors = true;
                console.error('An error occured in the then/catch !', error);
                throw error; // bring error up alng the chain, thus catch() displays error too
            });
    }
    catch (error2) {
        console.error('An error occured in the try/catch !', error2);
    }
}

main();
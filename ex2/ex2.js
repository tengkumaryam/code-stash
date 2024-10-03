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

async function fetchData(url) {
    console.log('a')
    try {
        console.log('b')
        const response = await axios.get(url, {timeout: 5000});
        console.log('c')
        return response.data;
    } catch(e) {
        console.log('d')
        return 'error';
    }
}

// requête GET
async function main() {
    let withErrors = false;

    // try {
    //     await timer()
    //         .then(() => axios.get('https://jsonplaceholder.typicode.com/posts?id=3'))
    //         .then(response => response.data)
    //         .then(async function (data) {
    //             console.log('reponse received')

    //             await timer();
    //             console.log('response with await', data);

    //             return timer().then(() => console.log('response with then', data));
    //         })
    //         .then(() => new Promise((_, reject) => reject(new Error('Boom !'))))
    //         .catch(function (error) {
    //             withErrors = true;
    //             console.error('An error occured in the then/catch !', error);
    //             throw error;
    //         });
    // } catch (error2) {
    //     console.error('An error occured in the try/catch !', error2);
    // }
    const startAt = Date.now();


    const urls = Array.from({ length: 100 }).map((val, index) => {
        return 'https://jsonplaceholder.typicode.com/posts?id=' + index
    })

    // const urls = [, 'https://jsonplaceholder.typicode.com/posts?id=2', 'https://jsonplaceholder.typicode.com/posts?id=3'];

    // urls.forEach(async url => {
    //     await timer();
    //     const response = await axios.get(url);
    //     console.log(response.data)
    // })

    const promises = urls.map(async (url) => fetchData(url));
    console.log('waiting for promises')
    const responses = await Promise.all(promises);

    // const avatar = responses[0]
    // const infos = responses[1]
    // const pub = responses[2];

    // const responses = [];
    // for(const url of urls) {
    //     console.log('a')
    //     try {
    //         console.log('b')
    //         const response = await axios.get(url, {timeout: 5000});
    //         console.log('c')
    //         responses.push(response.data);
    //     } catch(e) {
    //         console.log('d')
    //         responses.push('error');
    //     }
    // }
    // console.log('waiting for promises')
    

    const avatar = responses[0]
    const infos = responses[1]
    const pub = responses[2];

    const endAt = Date.now();

    console.log(`done in ${endAt - startAt}ms !`, {avatar, infos, publicite: pub})
}


main();
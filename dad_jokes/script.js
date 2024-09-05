const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', generateJoke);

generateJoke();

///USING ASYNC/AWAIT
//if we have await in a function we add async in front of the function
async function generateJoke() {
    
    const config = {
        headers: {
            Accept: 'application/json',
        },
    }

    //await is used to wait for the promise to be resolved and not have something else happen before it is resolved
    const res = await fetch('https://icanhazdadjoke.com', config);

    const data = await res.json();

    jokeEl.innerHTML = data.joke;
        
}

//USING .then()
// function generateJoke() {
    
//     const config = {
//         headers: {
//             Accept: 'application/json',
//         },
//     }

//     fetch('https://icanhazdadjoke.com', config)
//         .then((res) => res.json())
//         .then((data) => {
//             jokeEl.innerHTML = data.joke;
//         })
// }
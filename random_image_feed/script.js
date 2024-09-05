const container = document.querySelector('.container')
//we get the images from a url
const unsplashURL = 'https://source.unsplash.com/random/'
const rows = 5

//we have a maximum of 3 images per row
for(let i = 0; i < rows * 3; i++) {
    const img = document.createElement('img')
    //we concatenate the url with the random size
    img.src = `${unsplashURL}${getRandomSize()}`
    container.appendChild(img)
}

function getRandomSize() {
    //the random size gives us a different image
    //ex: 305x305
    return `${getRandomNr()}x${getRandomNr()}`
}

function getRandomNr() {
    //ex: 0.5 * 10 = 5 + 300 = 305
    return Math.floor(Math.random() * 10) + 300
}
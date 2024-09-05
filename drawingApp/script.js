const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

const ctx = canvas.getContext('2d');

let size = 10
let isPressed = false
colorEl.value = 'black'
let color = colorEl.value
//initially set x and y to undefined
let x
let y

canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    //if the mouse is pressed down, set x and y to the current mouse position
    x = e.offsetX
    y = e.offsetY
})

document.addEventListener('mouseup', (e) => {
    isPressed = false
    //on release, reset x and y to undefined
    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        //if the mouse is pressed down, set x2 and y2 to the new mouse position
        const x2 = e.offsetX
        const y2 = e.offsetY

        //if we only have circle, when moving the mouse too fast, we will see gaps between the circles
        drawCircle(x2, y2)
        //draw a line from the previous mouse position to the new mouse position
        drawLine(x, y, x2, y2)
        //update x and y to the new mouse position
        x = x2
        y = y2
    }
})

//canvas documentation: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    //starting point
    ctx.moveTo(x1, y1)
    //ending point
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    //we need to set the line width to twice the size of the circle so the line will be the same thickness as the circle
    ctx.lineWidth = size * 2
    ctx.stroke()
}
//////////////////////////

//change displayed size number
function updateSizeOnScreen() {
    sizeEL.innerText = size
}

//increase size
increaseBtn.addEventListener('click', () => {
    size += 5

    if(size > 50) {
        size = 50
    }

    updateSizeOnScreen()
})

//decrease size
decreaseBtn.addEventListener('click', () => {
    size -= 5

    if(size < 5) {
        size = 5
    }

    updateSizeOnScreen()
})

//change color
colorEl.addEventListener('change', (e) => color = e.target.value)

//clear canvas
clearEl.addEventListener('click', () => ctx.clearRect(0,0, canvas.width, canvas.height))
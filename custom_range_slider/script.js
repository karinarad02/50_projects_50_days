const range = document.getElementById('range')

range.addEventListener('input', (e) => {
    // e.target is the input element
    // e.target.value is the value of the input element
    const value = +e.target.value
    const label = e.target.nextElementSibling

    const range_width = getComputedStyle(e.target).getPropertyValue('width')
    const label_width = getComputedStyle(label).getPropertyValue('width')

    // we remove the px from the width and convert it to a number
    const num_width = +range_width.substring(0, range_width.length - 2)
    const num_label_width = +label_width.substring(0, label_width.length - 2)

    // the min is 0 and the max is 100
    const max = +e.target.max
    const min = +e.target.min

    // we have 10 and -10 as corresponding values to the 0-100 mapping
    const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10)

    // we position the label according to the value of the input
    label.style.left = `${left}px`

    // we set the value to the label
    label.innerHTML = value
})

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
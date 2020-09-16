/* eslint-disable snakecasejs/snakecasejs */
const main = function () {
  const TOTAL_CAPACITY = 200000000.0
  const meter = document.getElementById('capacity')
  const meter_text = document.getElementById('capacity-text')
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/uploads/capacity')

  xhr.onload = function () {
    const bytes_used = JSON.parse(xhr.responseText).capacity
    const bytes_free = TOTAL_CAPACITY - bytes_used
    meter.setAttribute('value', bytes_used / TOTAL_CAPACITY)
    const formatted_used = (bytes_used / 1000000.0).toFixed(1)
    const formatted_percent = (100 * bytes_free / TOTAL_CAPACITY).toFixed(1)
    meter_text.innerText = `${formatted_used}/200MB Used (${formatted_percent}% Free)`
  }

  xhr.send(null)
}

window.onload = main

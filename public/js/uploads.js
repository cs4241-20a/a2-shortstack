/* eslint-disable snakecasejs/snakecasejs */
const request_delete = function (id, name) {
  let key = prompt(`Enter the the upload key for ${name} to confirm deletion\n(leave blank if no key was used)`)
  if (key === undefined) { key = '' }
  const data = JSON.stringify({ key: key })
  const xhr = new XMLHttpRequest()
  xhr.open('POST', `/uploads/delete/${id}`)
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')

  xhr.onload = function () {
    if (xhr.readyState === 4 && String(xhr.status).startsWith('2')) {
      const el = document.getElementById(`${id}-panel`)
      el.remove()
      ping_capacity()
    } else {
      const response = xhr.responseText
      alert(`Error: ${response}`)
    }
  }

  xhr.send(data)
}

const entries = document.querySelectorAll('.panel')
entries.forEach(entry => {
  const id = entry.id.split('-')[0]
  const delete_btn = document.getElementById(`${id}-delete`)
  const file_name = entry.getAttribute('title')
  delete_btn.addEventListener('click', function () {
    request_delete(id, file_name)
  })
  const date_elt = document.getElementById(`${id}-created_at`)
  date_elt.innerText = new Date(Date.parse(date_elt.innerText)).toLocaleString()
})

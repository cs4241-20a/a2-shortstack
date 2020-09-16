// Add some Javascript code here, to run on the front end.

const jam_btn = document.getElementById('jam-button')
const jam_song = document.getElementById('jam-song')
const jam_pic = document.getElementById('jam-pic')

let jamming = false
jam_btn.onclick = function () {
  jamming = !jamming
  if (jamming) {
    jam_song.play()
    jam_btn.innerText = 'Stop Jam'
  } else {
    jam_song.pause()
    jam_btn.innerText = 'Let\'s Jam'
  }
}

jam_song.onplay = function () {
  jam_pic.setAttribute('src', '/res/catjam.gif')
}

jam_song.onpause = function () {
  jam_pic.setAttribute('src', '/res/catjam.png')
}

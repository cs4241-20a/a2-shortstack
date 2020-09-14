  const start = () => {
  	newScrambled();
  	let inp = document.querySelector('#answer');
  	inp.addEventListener('keyup', (e) => {
  		event.preventDefault();
  		if (e.code === 'Enter') {
  			guessWord(inp.value);
  		}
  	});
  };

  const changeInputUnderlines = () => {
  	let length = document.querySelector('#scrambledWord').innerText.length,
  		input = document.querySelector('#answer'),
  		charWidth = 1,
  		gap = 0.5 * charWidth,
  		totalWidth = length * (charWidth + gap);
  	input.maxLength = length;
  	input.style.width = totalWidth;
  	input.style.letterSpacing = `${gap}ch`;
  	console.log(totalWidth, length, document.querySelector('#scrambledWord').innerHTML);
  	input.style.background = `repeating-linear-gradient(to right, black 0, black ${charWidth}ch, transparent 0, transparent ${charWidth + gap}ch) 0 100% / ${totalWidth - gap}ch 2px no-repeat`;
  	// input.style.background = `repeating-linear-gradient(90deg, dimgrey 0, dimgrey ${charWidth}ch, transparent 0, transparent ${charWidth}ch + ${gap}ch) 0 100%/ ${totalWidth}ch - ${gap}ch 2px no-repeat;`;
  	// input.style.background = 
  	console.log('l', input.style.background, $('#answer').css('color', 'green'));
  }

  const newScrambled = () => {
  	fetch('/currentWord', {
  		method: 'GET'
  	}).then((res) => {
  		res.text().then((newWord) => {
  			document.querySelector('#scrambledWord').innerHTML = newWord;
			changeInputUnderlines();
  		});
  	});
  };

  const guessWord = (guess) => {
  	data = JSON.stringify({'guess': guess});
  	fetch('/guess', {
  		method: 'POST',
  		body: data
  	}).then((res) => {
  		res.text().then((correct) => { // is either true or false to see if that was the correct word
  			if (correct === 'false') {
  				document.querySelector('#scrambledWord').classList.add('incorrect');
  				console.log(document.querySelector('#scrambledWord').classList);
  				setTimeout(() => document.querySelector('#scrambledWord').classList.remove('incorrect'), 2500)
  			} else {
				let score = document.querySelector('#currScore');
				score.innerHTML = parseInt(score.innerHTML) + 1;
				document.querySelector('#answer').value = '';
				newScrambled();
  			}
  		});
  	});
  };


  window.onload = function() {
    start();
  };
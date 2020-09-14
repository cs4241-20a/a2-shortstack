  function start() { // runs a lot of the functions necessary for the first time (scrambled word, enter in the input)
  	newScrambled();
  	updateScores();
  	updateCurrentScore();
  	let inp = document.querySelector('#answer');

  	inp.addEventListener('keyup', (e) => {
  		event.preventDefault();

  		if (e.code === 'Enter') {
  			guessWord(inp.value);
  		}
  	});
  };


  function hint() {
  	let inp = document.querySelector('#answer');

  	fetch('/hint', {
  		method: 'POST',
  		body: inp.dataset.hint.length
  	}).then((res) => {
  		res.text().then(char => {
  			inp.dataset.hint = inp.dataset.hint ? inp.dataset.hint + char : char;
  			inp.value = inp.dataset.hint;
  		});
  	});
  }


  function updateCurrentScore() {
  	fetch('/getCurrScore', {
  		method: 'GET'
  	}).then((res) => {
  		res.text().then(score => {
  			document.querySelector('#currScore').innerHTML = score;
  		});
  	})
  };


  function updateScores() {
	fetch('/getScores', {
  		method: 'GET'
  	}).then((res) => {
  		res.text().then((scores) => {
  			let insertDiv = document.querySelector('#serverscores');

  			scores = JSON.parse(scores);
  			scores = scores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
  			insertDiv.innerHTML = '';

  			scores.forEach((score, i) => {
  				if (i < 5){
	  				let ele = document.createElement('div');

	  				ele.innerHTML = `${score.name}: ${score.score}`;
	  				insertDiv.appendChild(ele);
  				}
  			});
  		});
  	});
  };


  function endGame() { // ends the game and sends score to the server
  	let name = document.querySelector('#boardName').value ? document.querySelector('#boardName').value : '???';
  	let date = new Date();
  	let scorejson = JSON.stringify({"date": date, "name": name.toUpperCase(), "score": 0});

  	fetch('/newScore', {
  		method: 'POST',
  		body: scorejson
  	}).then((res) => {
  		updateScores();
  		newScrambled();
  		updateCurrentScore();
  	});
  };


  function changeInputUnderlines() {  // Change all the css styling needed for the dynamic character underlines
  	let length = document.querySelector('#scrambledWord').innerText.length,
  		input = document.querySelector('#answer'),
  		charWidth = 1,
  		gap = 0.5 * charWidth,
  		totalWidth = length * (charWidth + gap);

	input.value = '';
	input.dataset.hint = '';
  	input.maxLength = length;
  	input.style.width = `${totalWidth}ch`;
  	input.style.letterSpacing = `${gap}ch`;
  	input.style.background = `repeating-linear-gradient(to right, black 0, black ${charWidth}ch, transparent 0, transparent ${charWidth + gap}ch) 0 100% / ${totalWidth - gap}ch 2px no-repeat`;
  };


  function newScrambled() { // Changes the scrambled word to a new one from the server
  	document.querySelector('#scrambledWord').innerHTML = 'Loading...';
  	fetch('/currentWord', {
  		method: 'GET'
  	}).then((res) => {
  		res.text().then((newWord) => {
  			document.querySelector('#scrambledWord').innerHTML = newWord;
			changeInputUnderlines();
  		});
  	});
  };


  function guessWord(guess) { // takes in a value and sends it to the server to see if its correct
  	data = JSON.stringify({'guess': guess});
  	fetch('/guess', {
  		method: 'POST',
  		body: data
  	}).then((res) => {
  		res.text().then((correct) => { // is either true or false to see if that was the correct word
  			let scrambled = document.querySelector('#scrambledWord')
  			let inp = document.querySelector('#answer');

  			if (correct === 'false') {

  				scrambled.classList.add('incorrect');
  				setTimeout(() => scrambled.classList.remove('incorrect'), 2500);
  			} else {
				scrambled.classList.remove('incorrect')
				updateCurrentScore();
				newScrambled();
  			}
  		});
  	});
  };


 function answerkey() { // prints the answer key
 	let randomwords = ['size','pipe','show','toy','zipper','throne','baby','seat','river','ocean','spade',
	'pump','cakes','skate','cat','vegetable','nut','furniture','tendency','car','sleet','truck','basket','writer',
	'fish','rock','ants','border','experience','kitty','flesh','servant','hydrant','planes','week','office',
	'dog','art','yak','distance','stocking','snails','playground','knot','curtain','wrench','daughter','seashore',
	'side','channel','cow','surprise','team','partner','paper','leg','arch','produce','bell','language','hope',
	'women','angle','cream','jar','respect','pigs','loaf','fly','time','uncle','move','earth','pies','flame',
	'door','place','wing','fact','cherries','need','knee','ground','key','farm','direction','crayon','authority',
	'idea','cake','winter','copper','son','cactus','caption','road','slope','trouble','finger','comparison'];
 	console.log(randomwords);
 }

  window.onload = () => { // just runs start when page opens
    start();
  };
// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
          inputTwo = document.querySelector( '#youranswer'),
          inputThree = document.querySelector('#difficulty'),
          inputFour = document.querySelector( '#importance'),
          json = { 'question': input.value, 'answer': inputTwo.value, 'difficulty': inputThree.value, 'importance': inputFour.value},
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      console.log("got response")
      // do something with the reponse 
      console.log( response )
      return response.json()
    })
    .then(function (txt){
      let list = JSON.stringify(txt)
      console.log("txt:"+ list)
      //let myheader=document.querySelector( '#result' )
      //myheader.innerText= list
      
      updateCards(txt)
      
    })
    return false
  }
  
  const clear = function clear() {
    console.log("tring to clear")
    fetch( '/clear', {
      method:'POST'
    }).then( function( response ) {
      console.log("got response")
      console.log( response )
      document.getElementById("slides").innerHTML = "";
      let div= document.createElement("div");
      div.classList.add('flashcard');
      let para = document.createElement("P"); 
      para.classList.add('words');
      para.innerHTML = "Create a new card to begin"
      div.appendChild(para);
      document.getElementById("slides").appendChild(div);
      return response.json()
    })
  }
  
  function showAnswer(){
    var answers = document.getElementsByClassName("words");
    answers[slideIndex-1].style.display = "block";
    const revealBtn = document.getElementsByClassName( 'reveal' )
    revealBtn[slideIndex-1].style.display="none"
  }
  
  function updateCards(txt){
    document.getElementById("slides").innerHTML = "";
    for(let i=0; i<txt.length; i++){
      let div= document.createElement("div");
      div.classList.add('flashcard');
      div.style.display='none';
      let ques = document.createElement("H4")
      let para = document.createElement("P");  
      let btn = document. createElement("BUTTON")
      btn.classList.add('reveal')
      btn.innerHTML= 'reveal'
      btn.onclick = showAnswer
      para.classList.add('words')
      para.style.display='none';
      let question = document.createTextNode((i+1)+ ". "+txt[i].question);// Create a text node
      ques.appendChild(question);
      let answer = document.createTextNode(txt[i].answer);// Create a text node
      para.appendChild(answer);  
      div.appendChild(ques);
      div.appendChild(para);// Append the text to <p>
      div.appendChild(btn)
      document.getElementById("slides").appendChild(div);
    }
    plusSlides(0);
  }

  window.onload = function() {
    const button = document.getElementsByClassName("submit")[0];
    button.onclick = submit
    const buttonClr = document.getElementsByClassName("clear")[0];
    buttonClr.onclick = clear
  }
    
  let slideIndex = 1;
  showSlides(slideIndex);
    
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
    
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("flashcard");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "flex";  
  }  
const catIndexRoute = '/api/cats',
      catUpdateRoute = '/api/updateCat/',
      catDeleteRoute = '/api/deleteCat/',
      catNewRoute = '/api/newCat'

let defaultCatList
let loadingMessage
let userCatList
let userCatListHeading
let cats 

//Enabling Use-Strict Mode
'use-strict'

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
    })

    return false
}

window.onload = function() {
    defaultCatList = document.getElementById("catList")
    loadingMessage = document.getElementById("loadingMessage")
    userCatListHeading = document.getElementById("userCatHeading")
    userCatList = document.getElementById("userCatList")
    // const button = document.querySelector( 'button' )
    // button.onclick = submit
    const apiUrl = "/api/cats"

    fetch(apiUrl)
    .then(response => response.json())
    .then(cats => {
        loadCats(cats)
    })
    .catch((err) => {
        console.log(err)
    })
}

const loadCats = (apiCats) => {
    cats = apiCats
    const default_cats = cats.default_cats
    default_cats.map((cat) => {
        createCatCard(cat, defaultCatList, false)
    })
    const user_cats = apiCats.user_cats
    if(user_cats.length > 0){
       createUserCatList(user_cats)
    }
}

const createCatCard = (cat, catList, includeButton) => {
   const catCard = document.createElement("article")
   catCard.className = "c_catCard"

   const catCardImage = new Image()
   catCardImage.src = cat.imageUrl
   catCardImage.alt = `A picture of a cat named ${cat.name}`
   catCardImage.loading = 'lazy'
   catCardImage.className = 'c_catCard__catImage'

   const catCardHeader = document.createElement("header")
   catCardHeader.className = "c_catCard__catHeader"

   const catCardName = document.createElement("h4")
   catCardName.innerText = cat.name
   catCardName.className = "u_txt--hdg4 c_catCard__catName"

   const catCardInformation = document.createElement("section")
   catCardInformation.className = "c_catCard__catInformation"

   const catCardDescription = document.createElement("p")
   catCardDescription.className = "u_txt c_catCard__description"
   catCardDescription.innerText = cat.description   

   catCardInformation.appendChild(catCardDescription)
   if(includeButton){
    const catCardButton = document.createElement("button")
    catCardButton.className = "c_catList__secondaryButton"
    catCardButton.innerText = "Update Cat"
    catCardButton.id = `${cat.name}`
    catCardButton.onclick = () => {
        updateCatButton(catCardButton.id)
    }
    catCardInformation.appendChild(catCardButton)
   }
   catCardHeader.appendChild(catCardName)
   catCard.appendChild(catCardImage)
   catCard.appendChild(catCardHeader)
   catCard.appendChild(catCardInformation)

   catList.appendChild(catCard)
   loadingMessage.style = "display: none;"
}

const createUserCatList = (cats) => {
    userCatListHeading.style = "display: visible;"
    cats.map((cat) => {
        createCatCard(cat, userCatList, true)
    })
}  

const updateCatButton = (name) => {
    console.log(findCatByName(name))
}

const findCatByName = (name) => {
    return cats.user_cats.filter((cat) => cat.name === name)
}
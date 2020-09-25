// Add some Javascript code here, to run on the front end.

const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  let list = {};
  let userlist = "";

  const pw = document.querySelector("#pw");
  const title = document.querySelector("#movie");
  const rating = document.querySelector("#rating");

  list = { title: title.value, rating: rating.value };

  const input = document.querySelector("#yourname"),
    json = { id: input.value, pw: pw.value, data: list },
    body = JSON.stringify(json);
  //body = json;

  fetch("/submit", {
    method: "POST",
    body
  })
    .then(function(response) {
      // do something with the reponse
      console.log(response);
      return response.text();
    })
    .then(function(text) {
      const json = JSON.parse(text);
      console.log(json);

      let listtitle = document.querySelector("#listtitle");
      while (listtitle.firstChild) listtitle.removeChild(listtitle.firstChild);

      document
        .querySelector("#listtitle")
        .appendChild(document.createTextNode(json.id + "'s List"));

      let ul = document.querySelector("#list");
      while (ul.firstChild) ul.removeChild(ul.firstChild);

      for (let i = 0; i < json.movies.length; i++) {
        let node = document.createElement("LI");
        let textNode = document.createTextNode(json.movies[i].title);
        node.appendChild(textNode);
        document.querySelector("#list").appendChild(node);
      }
    });
  return false;
};

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
};

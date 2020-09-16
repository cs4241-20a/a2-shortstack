let postCache = [];
let currentEditID = -1;

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const username = document.querySelector("#username");
  const title = document.querySelector("#title");
  const message = document.querySelector("#message");
  const isSpoiler = document.querySelector("#spoiler");
  const isBug = document.querySelector("#bug");
  const isFluff = document.querySelector("#fluff");

  const json = {
    username: username.value,
    title: title.value,
    message: message.value,
    isSpoiler: isSpoiler.checked,
    isBug: isBug.checked,
    isFluff: isFluff.checked,
  };
  username.value = "";
  title.value = "";
  message.value = "";
  isSpoiler.checked = false;
  isBug.checked = false;
  isFluff.checked = false;

  const body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then(function (response) {
      console.log(response);
      switch (response.status) {
        case 200:
          return response.text();
        case 404:
          throw response;
      }
    })
    .then(function (template) {
      console.log(template);
      data = JSON.parse(template);
      document.getElementById("posts").innerHTML = data.posts.html;
      postCache = data.posts.json;
    })
    .catch(function (response) {
      console.log(response.statusText);
    });

  return false;
};

window.onload = function () {
  const submitButton = document.getElementById("create-post");
  submitButton.onclick = submit;
  const loadButton = document.getElementById("load-post");
  loadButton.onclick = loadEditFields;
  const deletePost = document.getElementById("delete-post");
  deletePost.onclick = del;
  const editPost = document.getElementById("edit-post");
  editPost.onclick = submitEdit;
};

function reloadPosts() {
  fetch("/posts")
    .then(function (response) {
      switch (response.status) {
        case 200:
          return response.text();
        case 404:
          throw response;
      }
    })
    .then(function (template) {
      data = JSON.parse(template);
      document.getElementById("posts").innerHTML = data.posts.html;
      postCache = data.posts.json;
    })
    .catch(function (response) {
      console.log(response.statusText);
    });
}

function loadEditFields() {
  const id = parseInt(document.getElementById("edit-id").value, 10);

  if (
    !postCache
      .map((entry) => {
        return entry._id;
      })
      .includes(id)
  ) {
    return false;
  }
  currentEditID = id;

  // unhide
  const title = document.getElementById("hide-title"),
    msg = document.getElementById("hide-message"),
    cats = document.getElementById("hide-categories"),
    button = document.getElementById("hide-button");

  toUnhide = [title, msg, cats, button];
  toUnhide.forEach((element) => {
    element.style.display = "block";
  });

  // fill in form
  post = postCache.filter((post) => post._id == id)[0];
  document.getElementById("edit-title").value = post.title;
  document.getElementById("edit-message").value = post.message;
  document.getElementById("edit-spoiler").checked = post.isSpoiler;
  document.getElementById("edit-bug").checked = post.isBug;
  document.getElementById("edit-fluff").checked = post.isFluff;

  return false;
}
function submitEdit() {
  // hide
  const titleElm = document.getElementById("hide-title"),
    msgElm = document.getElementById("hide-message"),
    catsElm = document.getElementById("hide-categories"),
    buttonElm = document.getElementById("hide-button"),
    toUnhide = [titleElm, msgElm, catsElm, buttonElm];
  toUnhide.forEach((element) => {
    element.style.display = "none";
  });
  document.getElementById("edit-id").value = "";

  const title = document.querySelector("#edit-title");
  const message = document.querySelector("#edit-message");
  const isSpoiler = document.querySelector("#edit-spoiler");
  const isBug = document.querySelector("#edit-bug");
  const isFluff = document.querySelector("#edit-fluff");

  const json = {
    id: currentEditID,
    title: title.value,
    message: message.value,
    isSpoiler: isSpoiler.checked,
    isBug: isBug.checked,
    isFluff: isFluff.checked,
  };
  const body = JSON.stringify(json);

  fetch("/edit", {
    method: "POST",
    body,
  })
    .then(function (response) {
      console.log(response);
      switch (response.status) {
        case 200:
          return response.text();
        case 404:
          throw response;
      }
    })
    .then(function (template) {
      console.log(template);
      data = JSON.parse(template);
      document.getElementById("posts").innerHTML = data.posts.html;
      postCache = data.posts.json;
    })
    .catch(function (response) {
      console.log(response.statusText);
    });

  return false;
}

function del() {
  const deleteID = document.querySelector("#delete-id");

  const json = {
    id: parseInt(deleteID.value, 10),
  };
  deleteID.value = "";
  const body = JSON.stringify(json);

  fetch("/delete", {
    method: "POST",
    body,
  })
    .then(function (response) {
      console.log(response);
      switch (response.status) {
        case 200:
          return response.text();
        case 404:
          throw response;
      }
    })
    .then(function (template) {
      data = JSON.parse(template);
      document.getElementById("posts").innerHTML = data.posts.html;
      postCache = data.posts.json;
    })
    .catch(function (response) {
      console.log(response.statusText);
    });

  return false;
}

reloadPosts();

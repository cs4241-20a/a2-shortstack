const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    const input = document.querySelector("#firstname"),
      input2 = document.querySelector("#lastname"),
      input3 = document.querySelector("#birthyear"),
      list = document.querySelector(".list"),
      json = {
        firstname: input.value,
        lastname: input2.value,
        birthyear: input3.value,
        age: "",
      },
      body = JSON.stringify(json);

    if (!input.value || !input2.value || !input3.value) {
      console.warn("Empty field");
      return;
    }

    if (
      input3.value.length !== 4 ||
      isNaN(+input3.value) ||
      +input3.value > new Date().getFullYear()
    ) {
      console.warn("invalid year");
      return;
    }

    fetch("/submit", {
      method: "POST",
      body,
    })
      .then((x) => x.json())
      .then((x) => {
        updatelist(list, x);
      });

    return false;
  };

  const updatelist = (list, items) => {
    list.innerHTML = "";

    items.map((i) => {
      const text = document.createTextNode(
          `First Name: ${i.firstname} | Last Name: ${i.lastname} | Birth Year: ${i.birthyear} | ~Age: ${i.age}`
        ),
        header = document.createElement("h2");

      header.appendChild(text);
      list.appendChild(header);
    });
  };

  window.onload = function () {
    const button = document.querySelector("button"),
      list = document.querySelector(".list");
    button.onclick = submit;

    fetch("/data")
      .then((x) => x.json())
      .then((x) => {
        updatelist(list, x);
      });
  };
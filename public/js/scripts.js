const cname_input = document.getElementById('cname');
const dname_input = document.getElementById('dname');
const pname_input = document.getElementById('pname');
const pcolor_input = document.getElementById('pcolor');
const ttype_input = document.getElementById('ttype');
const tangle_input = document.getElementById('tangle');
const drs_input = document.getElementById('drs');

function checkField(field) {
    if (field.value.length == 0) {
        field.classList.add('is-danger');
        return false;
    } else {
        field.classList.remove('is-danger');
        return true;
    }
}

cname_input.addEventListener('input', () => checkField(cname_input));
dname_input.addEventListener('input', () => checkField(dname_input));
pname_input.addEventListener('input', () => checkField(pname_input));

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    if(!checkField(cname_input) || !checkField(dname_input) || !checkField(pname_input)){
        return false;
    }

    const json = {
        cname: cname_input.value,
        dname: dname_input.value,
        pname: pname_input.value,
        pcolor: pcolor_input.value,
        ttype: ttype_input.value,
        tangle: tangle_input.value,
        drs: drs_input.checked
    }

    const body = JSON.stringify(json);

    fetch('/submit', {
        method: 'POST',
        body
    }).then(function (response) {
        // do something with the reponse 
        console.log(response)
    })

    return false;
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit
}
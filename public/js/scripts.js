const cname_input = document.getElementById('cname');
const dname_input = document.getElementById('dname');
const pname_input = document.getElementById('pname');
const pcolor_input = document.getElementById('pcolor');
const ttype_input = document.getElementById('ttype');
const tangle_input = document.getElementById('tangle');
const drs_input = document.getElementById('drs');

const result_modal = document.getElementById('result_modal');
const result_text = document.getElementById('result_text');
const result_spin = document.getElementById('result_spin');

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

    result_modal.classList.add('is-active');
    result_text.innerHTML = "";
    result_spin.style.display = "inline-block";



    fetch('/submit', {
        method: 'POST',
        body: JSON.stringify(json)
    }).then(response => { 
            return response.json();
        }
    ).then(data => {
        let time_seconds = Number(data.ltime);

        let minutes = Math.floor(time_seconds / 60);
        let seconds = time_seconds - minutes * 60;
        
        result_spin.style.display = "none";

        result_text.innerHTML = "Your time was <b> " + minutes + ":" + seconds.toFixed(3)
            + "</b>, putting you in <b> P" + data.position;
    });

    return false;
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit
}

function scrollToBottom() {
    cname_input.scrollIntoView(({ block: 'center',  behavior: 'smooth' }));
}
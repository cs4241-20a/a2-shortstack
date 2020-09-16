// Register HTML Elements
const addBtn = document.getElementById('add');
const current = document.getElementById('current');
const newentry = document.getElementById('newentry');

let tabularFront;

const create = function(element) {
	return document.createElement(element);
};

const append = function(parent, el) {
	return parent.appendChild(el);
};

const headings = function() {
	let th1 = create('th')
	let th2 = create('th')
	let th3 = create('th')
	let th4 = create('th')
	th1.innerHTML = "Name";
	th2.innerHTML = "Bike Number";
	th3.innerHTML = "Bike Brand";
	th4.innerHTML = "Class"

	let tr = create('tr');

	append(tr, th1);
	append(tr, th2);
	append(tr, th3);
	append(tr, th4);
	append(current, tr);
};

const refresh = function() {
	fetch('/refresh', {
		method: 'GET'
	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		tabularFront = data;
		current.innerHTML = "";
		headings();

		let rowCount = 1;
		tabularFront.map(function (row)) {
			let tr = create('tr');
			let td1 = create('th');
			let td2 = create('th');
			let td3 = create('th');
			let td4 = create('th');
			let td5 = create('th');
		};

		td1.innerHTML = row.name;
		td2.innerHTML = row.bikenumber;
		td3.innerHTML = row.bikebrand;
		td4.innerHTML = row.class;

		append(tr, td1);
		append(tr, td2);
		append(tr, td3);
		append(tr, td4);

		append(current, tr);

		tr.className = rowCount;
		rowCount++;

	});
};
refresh();


let input;
let modifyIndex = 0;

const makeBody = function () {
	const name = document.querySelector('#name');
	const bikeyear = document.querySelector('#bikeyear');

	const bikebrandTable = document.getElementById('bikebrand');
	let bikebrand;
	for (let i = 0; i < bikebrandTable.length; i++) {
		if (bikebrandTable[i].checked) {
			bikebrand = bikebrandTable[i].value;
			break
		}
	}

	const json = {
		name: name.value,
		bikeyear: bikeyear.value,
		bikebrand: bikebrand,
		modifyIndex
	};

	return JSON.stringify(json);
};

const handlePost = function () {
	let body = makeBody();
	let checkBody = JSON.parse(body);
	let hint = document.getElementById('hint');

	if (checkBody['name'] === ""
		|| checkBody['bikenumber'] === ""
		|| checkBody['bikebrand'] === "") {
		hint.innerHTML = "There are missing fields!";
	} else {
		hint.innerHTML = "";
		fetch(`/${input}`, {
			method: 'POST',
			body
		}).then(function (response) {
			console.log("Post sent to server: " + response);
			refresh();
		});
	}	
}

const setInput = function (e) {
    if (addBtn.innerHTML === "Submit") {
        input = 'add';
        handlePost();
    } else {
        input = 'modify';
        handlePost();
        rightHead.innerHTML = "New Race Entry";
        addBtn.innerHTML = "Submit";

        document.querySelector('#name').value = "";
        document.querySelector('#bikenumber').value = "";

        let bikebrandS = document.getElementsByName('bikebrand');
        for (let i = 0; i < bikebrandS.length; i++) {
            bikebrandS[i].checked = false;
        }

    }
    e.preventDefault();
    return false;
};
addBtn.onclick = setInput;

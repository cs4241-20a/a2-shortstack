// Register HTML Elements
const addBtn = document.getElementById('add');
const current = document.getElementById('current');

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
	let th5 = create('th')
	th1.innerHTML = "Name";
	th2.innerHTML = "Bike Year";
	th3.innerHTML = "Bike Brand";
	th4.innerHTML = "Bike CC's";
	th5.innerHTML = "Class"

	let tr = create('tr');

	append(tr, th1);
	append(tr, th2);
	append(tr, th3);
	append(tr, th4);
	append(tr, th5);
	append(current, tr);
};
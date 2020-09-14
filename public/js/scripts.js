'use strict';

const addButton = document.querySelector('.addButton');
var input = document.querySelector('.input');
var priorityButton = document.querySelector('.priorityButton');
var dateButton = document.querySelector('.dateButton');
const container = document.querySelector('.container');

//checks if local storage has been set and if not, it initializes it
if(window.localStorage.getItem("todos") === undefined){
     var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

//saves all todo items in local storage
var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);


class item{
    constructor(itemName, priority, date){
        this.iName = itemName;
        this.iPriority = priority;
        this.iDate = date;
    }

    //creates and displays all elements of item
    createItem(){
        var itemBox = document.createElement('div');
        itemBox.classList.add('item');
        
        var input = document.createElement('input');
        input.value = this.iName;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = 'text';
        
        var priorityField = document.createElement('select');
        var option1 = document.createElement("option");
        option1.value = 0;
        option1.text = "High";
        priorityField.appendChild(option1);
        var option2 = document.createElement("option");
        option2.value = 1;
        option2.text = "Medium";
        priorityField.appendChild(option2);
        var option3 = document.createElement("option");
        option3.value = 2;
        option3.text = "Low";
        priorityField.appendChild(option3);
        priorityField.selectedIndex = this.iPriority;
        priorityField.disabled = true;
        priorityField.classList.add('priorityButton');
        
        
        var dateField = document.createElement('input');
        dateField.value = this.iDate;
        dateField.disabled = true;
        dateField.classList.add('dateButton');
        dateField.type = 'date';
        
        var resultantField = document.createElement('input');
        this.recalculateDueDate(this.iDate, this.iPriority, resultantField);
        resultantField.disabled = true;
        resultantField.classList.add('resultantDate');
        resultantField.type = 'date';
        
        var editButton = document.createElement('button');
        editButton.className = "fas fa-edit";
        editButton.classList.add('editButton');
        editButton.addEventListener('click', () => this.edit(input, priorityField, dateField, this.iName, resultantField, editButton));
        
        var removeButton = document.createElement('button');
        removeButton.className = "glyphicon glyphicon-remove";
        removeButton.classList.add('removeButton');
        removeButton.addEventListener('click', () => this.remove(itemBox, this.iName));
        
        container.appendChild(itemBox);
        
        itemBox.appendChild(input);
        itemBox.appendChild(priorityField);
        itemBox.appendChild(dateField);
        itemBox.appendChild(resultantField);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);
        
    }
    
    //Recalculates the due date based on the new start date and priority value if/when they are changed
    recalculateDueDate(startDate, priorityValue, resultantField){
        var date = new Date(startDate);
        var dayIncrement = 3*priorityValue + 2;
        date.setDate(date.getDate() + dayIncrement);
        resultantField.value = formatDate(date);
    }


    //Overwrites changes to todo items to the todos list
    edit(input, priorityField, dateField, name, resultantField, button){
        if(input.disabled === true){
            input.disabled = !input.disabled;
            priorityField.disabled = !priorityField.disabled;
            dateField.disabled = !dateField.disabled;
            
            button.className = "fas fa-check";
            button.classList.add('editButton');
        }
    	else{
            input.disabled = !input.disabled;
            priorityField.disabled = !priorityField.disabled;
            dateField.disabled = !dateField.disabled;

            let todoIndex = findInTodos(name);
            if (todoIndex !== null){
                todos[todoIndex] = new item(input.value, priorityField.value, dateField.value); 
                this.recalculateDueDate(dateField.value, priorityField.value, resultantField);
                window.localStorage.setItem("todos", JSON.stringify(todos));
            }
            
            button.className = "fas fa-edit";
            button.classList.add('editButton');
        }
    }
    
    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
    
}


//takes date that might include time or other extraneous data and extracts only date in form YYYY-MM-DD
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

//Iterates through todos to find specific todo item
function findInTodos(name){
    for (var i = 0; i<todos.length; i++){
        if(todos[i].iName === name){
            return i;
        }
    }
    return null;
}


//Adds new todo item to the list of todos and resets fields to prepare for next submission
function check(){
	if(input.value !== "" && priorityButton.value !== "" && dateButton.value !== ""){ 
        var formItem = new item(input.value, priorityButton.value, dateButton.value);
        formItem.createItem();
        todos.push(formItem);
                
        window.localStorage.setItem("todos", JSON.stringify(todos));
		input.value = "";
        priorityButton.value = priorityButton.children[0].value;
        dateButton.value = "";

        console.log(todos);
	}else if (input.value === ""){
        alert("Please specify a to-do item by typing it in the text box below");
    }else if (dateButton.value === ""){
        alert("Please specify a date by selecting a date in the date box below");
    }
}

addButton.addEventListener('click', check);


//Allows enter key to be pressed instead of clicking the submit button
window.addEventListener('keydown', (e) =>{
    if (e.which === 13){
        check();
    }
})

//Displays all previously saved todo items
for (var v = 0 ; v < todos.length ; v++){
    var newItem = new item(todos[v].iName, todos[v].iPriority, todos[v].iDate);
    newItem.createItem();
}




"use strict"

const container = document.querySelector('.container');
var inputValue = document.querySelector('.task');
var inputDate = document.querySelector('.dueDate');
var inputPriority = document.querySelector('.selPriority');
const add = document.querySelector('.submitButton');

if(window.localStorage.getItem("todos") == undefined){
    var todos = [];
    window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);


class item{
   constructor(name, priority, date) {
       //this.createItem(name, priority, date);
       this.cName = name;
       this.cPriority = priority;
       this.cDate = date;
   }

   createItem(){
       var itemBox = document.createElement('div');
       itemBox.classList.add('item');

       var input = document.createElement('input');
       input.type = "text";
       input.disabled = true;
       input.value = this.cName;
       input.classList.add('item_input');

       var priorityF = document.createElement('select');
       var firstOption = document.createElement("option");
       firstOption.value = 2;
       firstOption.text = "Low";
       priorityF.appendChild(firstOption);
       var secondOption = document.createElement("option");
       secondOption.value = 1;
       secondOption.text = "Medium";
       priorityF.appendChild(secondOption);
       var thirdOption = document.createElement("option");
       thirdOption.value = 0;
       thirdOption.text = "High";
       priorityF.appendChild(thirdOption);
       priorityF.selectedIndex = this.cPriority;
       priorityF.disabled = true;
       priorityF.classList.add('item_sel');
       //priority.type = "text";

       var dateF = document.createElement('input');
       dateF.type = "date";
       dateF.disabled = true;
       dateF.value = this.cDate;
       dateF.classList.add('item_date');

       var derivedF = document.createElement('input');
       this.derivedData(this.cDate, this.cPriority, derivedF);
       derivedF.type = "date";
       derivedF.disabled = true;
       derivedF.classList.add('item_derived');

       //tester
       var dayF = document.createElement('input');
       this.dayCalc(this.cDate, derivedF.value, dayF);
       dayF.type = "text";
       dayF.disabled = true;
       dayF.classList.add('item_day');

       var edit = document.createElement('button');
       edit.innerHTML = "EDIT";
       edit.classList.add('edit');
       edit.addEventListener('click', () => this.edit(input, priorityF, dateF, this.cName, derivedF, dayF, edit));

       var remove = document.createElement('button');
       remove.classList.add('remove');
       remove.innerHTML = "REMOVE";
       remove.addEventListener('click', () => this.remove(itemBox, this.cName));

       container.appendChild(itemBox);

       itemBox.appendChild(input);
       itemBox.appendChild(priorityF);
       itemBox.appendChild(dateF);
       itemBox.appendChild(dayF); //tester
       itemBox.appendChild(derivedF);
       itemBox.appendChild(edit);
       itemBox.appendChild(remove);

   }

   derivedData(beginDate, priorityNum, derivedF) {
        var date = new Date(beginDate);
        var setIncrease = 2*priorityNum+3;
        date.setDate(date.getDate() + setIncrease);
        derivedF.value = setDate(date);
    }

    //tester
    dayCalc(beginDate, endDate, dayF) {
        var date1 = new Date(beginDate);
        var date2 = new Date(endDate);
        var diff = (date2.getTime() - date1.getTime())/(1000*3600);
        dayF.value = diff;
    }
   
   edit(input, priorityF, dateF, name, derivedF, dayF) {
       if(input.disabled === true){
          input.disabled = !input.disabled;
          priorityF.disabled = !priorityF.disabled;
          dateF.disabled = !dateF.disabled;
          button.classList.add('edit');
       }
       else{
           input.disabled = !input.disabled;
           priorityF.disabled = !priorityF.disabled;
           dateF.disabled = !dateF.disabled;

           let indexof = searchTodos(name);
           if (indexof = !null) {
                todos[indexof] = new item(input.value, priorityF.value, dateF.value);
                this.derivedData(dateF.value, priorityF.value, derivedF);
                this.dayCalc(dateF.value, derivedF.value, dayF); 
                window.localStorage.setItem("todos", JSON.stringify(todos));
           }
           
       }
   }

   remove(itemBox, name){
       itemBox.parentNode.removeChild(itemBox);
       let index = todos.indexOf(name);
       todos.splice(index, 1);
       window.localStorage.setItem("todos", JSON.stringify(todos));
   }

}

function setDate(date) {
    var currDate = new Date(date),
        month = '' + (currDate.getMonth() +1),
        day = '' + currDate.getDate(),
        year = currDate.getFullYear();
    
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    
    return [year, month, day].join('-');
}

function searchTodos(name) {
    for (var index=0; index<todos.length; index++) {
        if(todos[index].name === name) {
            return index;
        }
    }
    return null;
}

function check(){
   if(inputValue.value !== "" && inputPriority.value !== "" && inputDate.value !== ""){
       var buildValue = new item(inputValue.value, inputPriority.value, inputDate.value);
       buildValue.createItem();
       todos.push(buildValue);
       window.localStorage.setItem("todos", JSON.stringify(todos));
       inputValue.value = "";
       inputDate.value = "";
       inputPriority.value = inputPriority.children[0].value;
       console.log(todos);
   }
   else if(inputValue.value === "") {
       alert("Please enter a task in the task field");
   }
   else if(inputDate.value === "") {
    alert("Please indicate a begin date by selecting a date from the selector");
    }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
   if(e.which === 13){
       check();
   }
})

for (var v = 0 ; v < todos.length ; v++) {
   var build = new item(todos[v].cName, todos[v].cPriority, todos[v].cDate);
   build.createItem();
}
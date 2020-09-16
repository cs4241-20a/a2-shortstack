var gCurrentXFunction = null;
var gFunctionList = [];

  window.onload = function() {
    var graph_container = document.getElementById("graph_container");
    
    for(var i = 0; i < 25*25; i++)
    {
          var item = document.createElement("div");
          item.classList.add("grid-item");
          var yCoord =  24 - Math.floor(i / 25);
          var xCoord = i % 25;
          item.id = yCoord+","+xCoord;
          
          graph_container.appendChild(item);
    }
    
    fetch( '/getFunctions', {
     method:'GET', 
    })
    .then( function( response ) {
      // do something with the reponse 
      return response.text();
    }).then(function (txt){
      console.log("function list returned: "+txt+"\n");
      gFunctionList = JSON.parse(txt);
      if(gFunctionList.length > 0)
      {
          document.getElementById("functionTextArea").value = gFunctionList[0]["x_function"];      
          populateFunctionList();
          parseFunction();
      }else{
          document.getElementById("functionTextArea").value = "x^1.2 - 2";
          submitFunction();
      }
    });
  
  }
    
  function populateFunctionList()
  {
    var functionsListElement = document.getElementById("functionsList");
    while (functionsListElement.firstChild) {
      functionsListElement.removeChild(functionsListElement.lastChild);
    }  
    
    for(var i = 0; i < gFunctionList.length; i++)
    {
      var functionText = gFunctionList[i]["x_function"];
      var listItem = document.createElement("li");
      var pItem = document.createElement("p");
      pItem.innerHTML = functionText;
      listItem.appendChild(pItem);
      listItem.addEventListener("click", onFunctionClick);
      functionsListElement.appendChild(listItem);
    }
  }
    
  function onFunctionClick()
  {
    //when a function in the list has been clicked, set the value of the text box and call parseFunction.
    var element = this;
    var pElement = element.firstChild;
    console.log("onFunctionClick called! innerHTML: "+pElement.innerHTML+"\n");
    document.getElementById("functionTextArea").value = pElement.innerHTML;
    
    parseFunction();
  }
    
  function submitFunction()
  {
    var textArea = document.getElementById("functionTextArea");
    
    var jsonObject = {
      x_function: textArea.value.trim().toLowerCase()
    }
    var body = JSON.stringify(jsonObject);
    
    fetch( '/addFunction', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      return response.text();
    }).then(function (txt){
      var jsonObject = JSON.parse(txt);
      gFunctionList.unshift(jsonObject);
      populateFunctionList();
    });
    
    parseFunction();
  }
  
  //parse the function in mx + b form from the text area and draw to the screen.
  function parseFunction()
  {
    console.log("parseFunction() called. \n");
    var textArea = document.getElementById("functionTextArea");
    var xFunction = textArea.value;
    xFunction = xFunction.replace(/ /g, "");
    console.log("xFunction: "+xFunction+"\n");
    xFunction = xFunction.toLowerCase();
    xFunction = xFunction.trim(); //get rid of trailing/leading newlines.
    xFunction = xFunction.replace("y=", "");
    
    
    var index = xFunction.indexOf("x");
    var xTerm = xFunction.slice(0, index);
    console.log("xTerm: "+xTerm);
    
    var operationIndexes = getOperationIndexes(xFunction);
    
    var xOperation = new XTerm();
    
    gCurrentXFunction = new FunctionOfX();
    
    if(xFunction.length > xTerm.length + 2)
    {
      if(xFunction.charAt(index+1) === '^')
      {
          console.log("x has an exponent. \n");
          var exponent = 0.0;
          var end = xFunction.length;
          if(operationIndexes.length >= 1)
          {
                end = operationIndexes[0];
          }
          var exponentString = xFunction.slice(index+2, end);
          console.log("exponent string: "+exponentString+"\n");
          exponent = parseFloat(exponentString);
          console.log("exponent: "+exponent+"\n");
          xOperation = new Operation(new XTerm(), new ConstantTerm(exponent), '^');
                
      }
    }
    
    var completeXOperation = null;  
    if(xFunction.charAt(0) !== 'x')
    {
      var xCoeff = parseFloat(xFunction.slice(0, index));
      console.log("xCoeff: "+xCoeff+"\n");
    
      var xCoeffTerm = new ConstantTerm(xCoeff);
      completeXOperation = new Operation(xCoeffTerm, xOperation, '*');
    }else{
      completeXOperation = xOperation;
      console.log("plain x op set. \n");
      if(xOperation)
      {
        
      }else{
        console.log("xOperation is null! \n");
      }
    }
    
    
    var additionalOperation = null;
    if(operationIndexes.length >= 1)
    {
      var operation = xFunction.charAt(operationIndexes[0]);
      var constant = xFunction.slice(operationIndexes[0]+1, xFunction.length);
      additionalOperation = new Operation(new ConstantTerm(0), new ConstantTerm(parseFloat(constant)), operation);
      
      console.log("constant: "+constant + "\n");
    }
    
    gCurrentXFunction.setXOperation(completeXOperation);
    if(additionalOperation)
    {
        gCurrentXFunction.setOperation(additionalOperation);  
    } 
    drawFunction();
  }
    
  function getOperationIndexes(xFunction)
    {
      var operationIndexes = [];
      for(var i = 0; i < xFunction.length; i++)
      {
        if(isOperation(xFunction.charAt(i)))
        {
          operationIndexes.push(i);
        }
      }
      return operationIndexes;
    }
  
  //draw the current function of x defined in gCurrentXFunction
  function drawFunction()
  {
        //use gCurrentXFunction
        var y = 0;
        
    //clear all cells to original color
        var children = document.getElementById("graph_container").children;
        for(var i = 0; i < children.length; i++)
          {
            children[i].style.backgroundColor = "#94ddff";
            //child.style.backgroundColor = "#94ddff"//rgba(255, 255, 255, 0.8);
          }
    
        for(var i = 0; i < 25; i++)
        {
            var tempY = gCurrentXFunction.compute(i);
            //var tempY = 2 *i;
          
            var intY = Math.floor(tempY);
            //console.log("tempY:"+tempY+"\n");
            if((tempY - intY) > 0.5)
            {
                y = Math.ceil(tempY);
            }else{
                y = Math.floor(tempY);
            }
            
            var x = 0;
            if( (i - Math.floor(i)) > 0.5)
            {
                x = Math.ceil(i);
            }else{
              x = Math.floor(i);
            }
            var cell = document.getElementById(y+","+Math.floor(i));
            if(cell)
            {
              cell.style.backgroundColor = "red";    
            }
        }
  }
    
  var operationsList = ["+", "-", "*", "/"];
  //returns true if the given character is in fact a mathematical operation includes in the list above.
  function isOperation(character)
  {
    if(operationsList.includes(character))
    {
      return true;
    }
    return false;
  }
  
  //class to represent a mathematical operation between two terms.
  class Operation
  {
    constructor(term1, term2, operation, value)
    {
      this.term1 = term1;
      this.term2 = term2;
      this.operation = operation;
      this.result = value;
      console.log("operation "+ this.operation + " term1: "+this.term1.getValue(0)+", term2: "+this.term2.getValue(0)+"\n");
    }
    
    getValue(x)
    {
      //term1 and term2 are either of type Operation, ConstantTerm or XTerm, all define getValue(x)
      this.compute(this.term1.getValue(x), this.term2.getValue(x));
      return this.result;
    }
    
    compute(term1, term2)
    {
      switch(this.operation)
      {
        case '+':
          this.result = term1 + term2;
          break;
        case '-':
          this.result = term1 - term2;
          break;
        case '*':
          this.result = term1 * term2;
          break;
        case '^':
          this.result = Math.pow(term1, term2); //for handling an exponent, term2 is the degree.
          break;
        default:
          console.log("unknown operation: "+this.operation+"\n");
          break;
      }
    }
  }
  
  //class to represent a constant term that is not a function of x.
  class ConstantTerm
  {
    constructor(value)
    {
      this.value = value;
    }
    
    getValue(x)
    {
      return this.value;
    }
  }
    
  //class to represent an instance of x.
  class XTerm
    {
       constructor()
        {
        
        }
      
        getValue(x)
        {
          return x;
        }
      
    }
  
  //class used to represnet a function of x in mx + b form.
  class FunctionOfX
    { 
      constructor()
      {
        console.log("FunctionOfX created! \n");
        this.termsList = []
      }
      
      setXOperation(xOperation)
      {
        this.xOperation = xOperation;
      }
      
      setOperation(operation)
      {
        this.additionalOp = operation;
      }
      
      
      addTerm(operation)
      {
        this.termsList.push(operation);
      }
      
      compute(x)
      {
        var sum = 0;
        sum += this.xOperation.getValue(x);
        if(this.additionalOp)
          sum += this.additionalOp.getValue(x);
        
        return sum;
      }
    }
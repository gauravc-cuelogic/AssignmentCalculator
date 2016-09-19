/*
localStorage.setItem('favoriteflavor','vanilla');
var taste = localStorage.getItem('favoriteflavor');
alert(taste);
localStorage.removeItem('favoriteflavor');
*/
function Calculate () {
  var operators = {
    '+': function(a, b) { return a + b },
    '-': function(a, b) { return a - b },
    '*': function(a, b) { return a * b },
    '/': function(a, b) { return a / b },
    '=': function(a) {
        try {
          return calculate(a)
        } catch (err) {
          return "Malformed Expression";
        }
    },
   };

   function calculate(fn) {
     return new Function('return ' + fn)();
   }

   function evaluateInput () {
     document.getElementById("listCalculations").innerHTML = "";
     var ul = document.createElement('ul');
     document.getElementById('listCalculations').appendChild(ul);

     Object.keys(localStorage).forEach(function(key){
       if(key != 'clickcount'){
         var li = document.createElement('li');
         li.setAttribute('class','item');
         ul.appendChild(li);
         var input = JSON.parse(localStorage.getItem(key));
         var result = input.input + '=' + input.output;
         li.innerHTML=li.innerHTML + result;
      }
     });
   }

  this.storedKey = 0;
  this.setInput = function (newValue) {
    switch (newValue) {

      case '=' :
        var inputValue = document.getElementsByName('display')[0].value;
        var output = operators[newValue](inputValue);
        var storeValue = {'input' : inputValue, 'output' : output};
        if(this.storedKey > 0 ){
            localStorage.setItem(this.storedKey,storeValue);
            this.storedKey = 0;
        }else{
          if (localStorage.clickcount) {
              localStorage.clickcount = Number(localStorage.clickcount) + 1;
          } else {
              localStorage.clickcount = 1;
          }
          localStorage.setItem(localStorage.clickcount,JSON.stringify(storeValue));
        }
        document.getElementsByName('display')[0].value = output;
        evaluateInput ();
      break;

      case 'C' :
        document.getElementsByName('display')[0].value = '';
      break;

      default :
        var oldInputValue = document.getElementsByName('display')[0].value;
        document.getElementsByName('display')[0].value = oldInputValue+newValue;
      break;

    }

  }

}

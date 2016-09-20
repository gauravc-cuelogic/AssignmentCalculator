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

   this.evaluateInput = function  () {
     document.getElementById("listCalculations").innerHTML = "";
     var ul = document.createElement('ul');
     document.getElementById('listCalculations').appendChild(ul);

     Object.keys(localStorage).forEach(function(key){
       if(key != 'clickcount'){
         var li = document.createElement('li');

         ul.appendChild(li);
         var input = JSON.parse(localStorage.getItem(key));
         var result = '<span onclick="loadInputs('+key+')" class="cursor">'+input.input + '=' + input.output+'</span>';
         li.innerHTML=li.innerHTML + result;

         var span = document.createElement('span');
         span.setAttribute('onclick','deleteCalculation("'+key+'")');
         span.setAttribute('class' , 'cursor');
         span.innerHTML= '   X';
         li.appendChild(span);
      }
     });
   }

  this.storedKey = 0;
  this.setInput = function (newValue) {

    switch (newValue) {

      case '=' :
        var inputValue = document.getElementsByName('display')[0].value;
        var output = operators[newValue](inputValue);
        if(!isNaN(output) && isFinite(output) ){
          var storeValue = {'input' : inputValue, 'output' : output};
          if(this.storedKey > 0 ){
              localStorage.setItem(this.storedKey,JSON.stringify(storeValue));
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
          this.evaluateInput ();
        }else {
          document.getElementsByName('display')[0].value = output;
        }
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

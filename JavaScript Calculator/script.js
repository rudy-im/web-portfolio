$(document).ready(function() {
  let display = $("#display");
  display.val("0");
  
  function addChar(char) {
    let current = display.val();
    
    current = current.replace(/^0+/, "");
    
    if(char.match(/^[\+\-]$/)){
      current = current.replace(/[\+\-\/\*]{2,}$/, "");
    }
    
    if(char.match(/^[\*\/]$/)){
      current = current.replace(/[\+\-\/\*]+$/, "");
    }
    
    if(char===".") {
      if(current.match(/\d+\.+\d*$/)) return;
    }
    
    display.val(current + char);
  }
  
  function backspace() {
    let current = display.val();
    current = current.slice(0, -1);
    if(current.length===0) current = "0";
    display.val(current);
  }
  
  function clear() {
    display.val("0");
  }
  
  function equals() {
    try {
      let result = math.evaluate(display.val());
      display.val(result);
    } catch {
      display.val("Error");
    }
  }

  $(".number, .operator, #decimal").click(function() {
    addChar($(this).text());
  });
  
  $("#backspace").click(function() {
    backspace();
  });

  $("#clear").click(function() {
    clear();
  });

  $("#equals").click(function() {
    equals();
  });
  
  $(document).keydown(function(event) {
    const numopsdot = /^[\d\+\-\*\/\.]$/
    if(numopsdot.test(event.key)) addChar(event.key);
    
    if (event.key === "Backspace") backspace();
    if (event.key.toUpperCase() === "C") clear();
    if (event.key === "Enter") equals();
  });
});

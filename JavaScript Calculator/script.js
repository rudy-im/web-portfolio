$(document).ready(function() {
  let display = $("#display");
  display.val("0");
  
  function addChar(char) {
    let current = display.val();
    current = current.replace(/^0+/, "");
    display.val(current + char);
  }
  
  function backspace() {
    let current = display.val();
    display.val(current.slice(0, -1));
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

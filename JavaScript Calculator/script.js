
$(document).ready(function() {
  let display = $("#display");

  $(".btn").not("#equals, #clear").click(function() {
    let current = display.val();
    let value = $(this).text();
    display.val(current + value);
  });

  $("#clear").click(function() {
    display.val("");
  });

  $("#equals").click(function() {
    try {
      let result = math.evaluate(display.val());
      display.val(result);
    } catch {
      display.val("Error");
    }
  });
});

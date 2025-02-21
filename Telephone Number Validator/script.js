
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");
const anim = document.getElementById("bg-animation");
const bg = document.getElementById("bg-img");

const hideResult = () => {
  result.innerText = "";
  result.classList.add("hide");
}

const showResult = message => {
  result.innerText = message;
  result.classList.remove("hide");
}

const hideAnim = () => {
  anim.classList.add("hide");
}

const showAnim = () => {
  anim.classList.remove("hide");
}

const clear = () => {
  hideResult();
  hideAnim();
  userInput.value = "";
}

const checkInput = () => {
  const input = userInput.value;
  if(!input){
    alert("Please provide a phone number");
    return;
  }

  const validRegex = /^(\d?)(?:\s*\((\d\d\d)\)\s*|[\s-]*(\d\d\d)[\s-]*)(\d\d\d)[\s-]*(\d\d\d\d)$/;
  let match;

  try {
    match = input.match(validRegex);
  } catch (e) {
    showResult("Invalid US number: " + input);
    return;
  }

  if(!match || (match[1]!=='1' && match[1])){
    showResult("Invalid US number: " + input);
    return;
  }

  showResult("Valid US number: " + input);
}

userInput.addEventListener("click", hideResult);
userInput.addEventListener("click", showAnim);
userInput.addEventListener("keydown", (e)=>{
  if(e.key==="Enter") {
    e.preventDefault();
    checkInput();
  }
 });
checkBtn.addEventListener("click", checkInput);
clearBtn.addEventListener("click", clear);

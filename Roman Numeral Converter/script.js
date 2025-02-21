
// background decoration

const decoNumsContainer = document.querySelector(".deco-nums");
const decoNumList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'I', "II", "IV", 'V', "VI", 'IX', 'X'];
const decoNums = [];

for(let i=0; i<12; i++){
  const decoNum = document.createElement("div");
  decoNum.classList.add("deco-num");
  decoNum.style.transform = `rotate(${i*30}deg)`;
  decoNum.innerText = '1';
  decoNumsContainer.appendChild(decoNum);
  decoNums.push(decoNum);
}

function decoNumAnimation(){
  for (const decoNum of decoNums){
    decoNum.innerText = decoNumList[Math.floor(Math.random()*decoNumList.length)] || decoNumList[0];
  }
  setTimeout(decoNumAnimation, 500);
}

decoNumAnimation();



// Roman numeral converter

const numInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const romanNumeral = {
  1000: 'M',
  900: 'CM',
  500: 'D',
  400: 'CD',
  100: 'C',
  90: 'XC',
  50: 'L',
  40: 'XL',
  10: 'X',
  9: 'IX',
  5: 'V',
  4: 'IV',
  1: 'I'
}

function showOutput(classStyle, text){
  output.setAttribute("class", classStyle);
  output.innerText = text;
}

function clear(){
  numInput.value = "";
  output.innerText = "";
}

function convertToRoman(num){
  if(num<=0) return '';
  for (const unit of Object.keys(romanNumeral).reverse()){
    if(num>=unit){
      return romanNumeral[unit] + convertToRoman(num-unit);
    }
  }
}

function processInput(){
  const input = numInput.value;
  if(!input || input.match(/[^0-9+\-]/g)){
    showOutput("output-message", "Please enter a valid number");
    return;
  }

  const intInput = parseInt(input);
  if(input<=0){
    showOutput("output-message", "Please enter a number greater than or equal to 1");
    return;
  }
  else if(input>=4000){
    showOutput("output-message", "Please enter a number less than or equal to 3999");
    return;
  }

  showOutput("output-number", convertToRoman(intInput));
}

numInput.addEventListener("click", clear);
numInput.addEventListener("keydown", (e) => {
  if(e.key == 'Enter'){
	  e.preventDefault();
	  processInput();
  }
});

convertBtn.addEventListener("click", processInput);

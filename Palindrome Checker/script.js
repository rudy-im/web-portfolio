const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

function clean(str){
  let cleanStr = "";
  for(const ch of str.toLowerCase()){
    if(ch>='a' && ch<='z') cleanStr += ch;
    else if(ch>='0' && ch<='9') cleanStr += ch;
  }
  return cleanStr;
}

function isPalindrome(cleanStr){
  for(let i=0; i<=cleanStr.length/2; i++){
    if(cleanStr[i] !== cleanStr[cleanStr.length-i-1]) return false;
  }
  return true;
}

function checkPalindrome(){
  const str = textInput.value;
  if(!str){
    alert("Please input a value");
    return;
  }

  let decision = "";
  if(isPalindrome(clean(str))){
    decision = " is a palindrome";
  }
  else {
    decision = " is not a palindrome";
  }
  result.innerText = str+decision;
  result.classList.remove("hide");
}

checkBtn.onclick = checkPalindrome;

function hide(){
  result.classList.add("hide");
}

textInput.addEventListener("click", hide);
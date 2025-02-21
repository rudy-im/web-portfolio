let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
let cash;

const registerStatus = {
  insuficient: "INSUFFICIENT_FUNDS",
  closed: "CLOSED",
  open: "OPEN"
};
const cashValue = {
  'PENNY':	0.01,
  'NICKEL':	0.05,
  'DIME':	0.1,
  'QUARTER': 0.25,
  'ONE':	1,
  'FIVE': 5,
  'TEN':	10,
  'TWENTY':	20,
  'ONE HUNDRED': 100
};

let currentStatus = registerStatus.open;

const priceText = document.getElementById("price");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const result = document.getElementById("change-due");
const cidDiv = document.getElementById("cid");

function showPrice () {
  priceText.innerText = "Price: " + price;
}

function cleanCash(before) {
  return parseFloat((before).toFixed(2));
}

function getChanges(residue, arr){
  if(residue<=0) return arr;

  for(let i=cid.length-1; i>=0; i--){
    const currentUnit = cid[i][0];
    if(cashValue[currentUnit] <= residue) {
      if(cid[i][1] < cashValue[currentUnit]) continue;

      arr.length>0 && arr[arr.length-1][0]===currentUnit ? 
        arr[arr.length-1][1] = cleanCash(arr[arr.length-1][1]+cashValue[currentUnit]) :
        arr.push([currentUnit, cashValue[currentUnit]]);
      cid[i][1] = cleanCash(cid[i][1]-cashValue[currentUnit]);
      return getChanges(cleanCash(residue-cashValue[currentUnit]), arr);
    }
  }

  currentStatus = registerStatus.insuficient;
  let cidPointer = -1;
  while(arr.length>0){
    const [unit, amount] = arr.pop();
    while(cidPointer<cid.length){
      cidPointer++;
      if(cid[cidPointer][0]===unit) break;
    }
    if(cidPointer>=cid.length) return;
    cid[cidPointer][1] = cleanCash(cid[cidPointer][1]+amount);
  }
}

function checkIfClosed() {
  const isClosed = cid.every(([unit, amount])=>amount<=0);
  if(isClosed) currentStatus = registerStatus.closed;
  return isClosed;
}

function processInput() {
  cash = parseFloat(cashInput.value);

  if(isNaN(cash)) {
    alert("Enter correct value!!");
  }
  else if(price>cash)  {
    alert("Customer does not have enough money to purchase the item");
  }
  else if(price===cash) {
    result.innerText = "No change due - customer paid with exact cash";
  }
  else {
    const changes = [];
    getChanges(cleanCash(cash-price), changes);
    const isClosed = checkIfClosed();

    result.innerText = `Status: ${currentStatus}`;
    changes.forEach(([unit, amount])=> {
      result.innerText += ` ${unit}: \$${amount}`;
    });
    if(!isClosed) currentStatus = registerStatus.open;
    updateCidDiv();
  }
}

function updateCidDiv() {
  cidDiv.innerHTML = "";
  cid.forEach(([unit, amount]) => {
    cidDiv.innerHTML += `<br>${unit} : ${amount}`;
  })
  cidDiv.innerHTML += `<br><br><br>Current Cash`;
}

showPrice();
updateCidDiv();
purchaseBtn.addEventListener("click", processInput);
cashInput.addEventListener("keydown", e => {
  if(e.key==="Enter") {
    e.preventDefault();
    processInput();
  }
});
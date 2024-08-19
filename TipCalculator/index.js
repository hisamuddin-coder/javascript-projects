const billTotalInput = document.querySelector("#bill-total-input");
const tipInput = document.querySelector("#tip-input");
const numOfPeopleDiv = document.querySelector(".num-people");
const totalPerPersonEl = document.querySelector(".total-per-person-el");
const totalBill = document.querySelector(".total-bill");
const totalTipEl = document.querySelector(".total-tip-el");
const tipBtns = document.querySelectorAll(".tip-btn");
const increaseBtn = document.querySelector(".plus");
const decreaseBtn = document.querySelector(".minus");

let numOfPeople = Number(numOfPeopleDiv.innerText);

tipBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let percentageText = btn.textContent;
    let percantageValue = parseInt(percentageText);
    tipInput.value = percantageValue;
    calculateBill();
  });
});

const calculateBill = function () {
  const billInput = Number(billTotalInput.value);
  const tip = Number(tipInput.value) / 100;
  const totalTip = billInput * tip;
  const total = totalTip + billInput;
  const perPersonTotal = total / numOfPeople;
  totalPerPersonEl.innerText = `${perPersonTotal.toFixed(2)}`;
  totalBill.innerText = `${total.toFixed(2)}`;
  totalTipEl.innerText = `${totalTip.toFixed(2)}`;
};
calculateBill();

const increasePeople = function () {
  numOfPeople += 1;
  numOfPeopleDiv.innerText = numOfPeople;
  calculateBill();
};
const decreasePeople = function () {
  if (numOfPeople === 1) return;
  numOfPeople -= 1;
  numOfPeopleDiv.innerText = numOfPeople;
  calculateBill();
};

increaseBtn.addEventListener("click", increasePeople);
decreaseBtn.addEventListener("click", decreasePeople);

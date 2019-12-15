
// basic operations functions. The 1st parameters correspond to the 
// first operands
function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function modulo(a, b) {
	return a % b;
}

// returns the result of performing a given operation on two operands
function operate(operator, a, b)
{
	switch (operator)
	{
		case PLUS:
			return add(a, b);
			break;
		case MINUS:
			return subtract(a, b);
			break;	
		case TIMES:
			return multiply(a, b);
			break;
		case DIV:
			return divide(a, b);
			break;
		case MOD:
			return modulo(a, b);
			break;
		default:
			return 0;
	}
}

function  displayChar(chtr) {
	// if the next character is 0 and 0 is already displayed, do nothing
	if (chtr !== "0" || displayVal !== "0")
	{
		// if display val is currently 0, replace the 0 with the entered
		// digit
		if (displayVal === "0")
		{
			displayVal = chtr;
		}
		else
		{
			displayVal = displayVal + chtr;
		}
		displayText.nodeValue = displayVal;
	}
}


// constants representing each of the operators
const PLUS = 1;
const MINUS = 2;
const TIMES = 3;
const DIV = 4;
const MOD = 5;

// holds the current value being displayed as a String
let displayVal = "0";

// references to all of the relevant elements of the calculator
const display = document.querySelector("#display");
const clrBtn = document.querySelector("#clear");
const plmBtn = document.querySelector("#plus-minus");
const modBtn = document.querySelector("#modulus");
const divBtn = document.querySelector("#divide");
const mulBtn = document.querySelector("#multiply");
const subBtn = document.querySelector("#subtract");
const addBtn = document.querySelector("#add");
const decBtn = document.querySelector("#decimal");
const equBtn = document.querySelector("#equals");
const zeroBtn = document.querySelector("#zero");
const oneBtn = document.querySelector("#one");
const twoBtn = document.querySelector("#two");
const threeBtn = document.querySelector("#three");
const fourBtn = document.querySelector("#four");
const fiveBtn = document.querySelector("#five");
const sixBtn = document.querySelector("#six");
const sevenBtn = document.querySelector("#seven");
const eightBtn = document.querySelector("#eight");
const nineBtn = document.querySelector("#nine");


// text node for the calculator display 
displayText = document.createTextNode(displayVal);
display.appendChild(displayText);


// event listeners for each of the number buttons which add the 
// relevant number to the display when clicked
zeroBtn.addEventListener("click", function() { displayChar("0"); });
oneBtn.addEventListener("click", function() { displayChar("1"); });
twoBtn.addEventListener("click", function() { displayChar("2"); });
threeBtn.addEventListener("click", function() { displayChar("3"); });
fourBtn.addEventListener("click", function() { displayChar("4"); });
fiveBtn.addEventListener("click", function() { displayChar("5"); });
sixBtn.addEventListener("click", function() { displayChar("6"); });
sevenBtn.addEventListener("click", function() { displayChar("7"); });
eightBtn.addEventListener("click", function() { displayChar("8"); });
nineBtn.addEventListener("click", function() { displayChar("9"); });




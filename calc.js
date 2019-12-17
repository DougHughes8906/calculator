
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

// outputs a string to the calculator display. 
function output(value) {
	displayText.nodeValue = value;	
}

// displays a given character as the next character on the currently
// displayed number
function  displayChar(chtr) { 
	// if the next character is 0 and 0 is already displayed, do nothing.
	// if an operator has just been pressed or an equals has just been
	// pressed, any character is printed. 
	if (chtr !== "0" || displayVal !== "0" || equPressed || opPressed) {	
		if (equPressed || opPressed) {
			equPressed = false;
			opPressed = false;
			if (chtr === ".") {
				displayVal = "0.";
			}
			else {
				displayVal = chtr;
			}
		}
		// if display val is currently 0, replace the 0 with the entered
		// digit (unless we are adding a decimal point)
		else if (displayVal === "0" && chtr !== ".") {	
			displayVal = chtr;
		}
		else {
			displayVal += chtr;
		}
		output(displayVal);	
	}
}


// constants representing each of the operators
const NO_OP = 0;  // represents no operation
const PLUS = 1;
const MINUS = 2;
const TIMES = 3;
const DIV = 4;
const MOD = 5;

// holds the current value being displayed as a String
let displayVal = "0";
// holds true if the current vlaue being displayed already has
// a decimal and false otherwise
let hasDecimal = false;
// holds the type of the first operator, which is set if there is
// a need to track to two prior operators (ex. 43 + 23 * ...).
// Set to NO_OP if there is no first operator currently being 
// tracked.
let firstOperator = NO_OP;
// holds the type of the last operator, which is set to NO_OP
// if there is not currently a last operation being tracked
let lastOperator = NO_OP;
// holds the numerical value of the first data entry that is being
// tracked (null if no such entry is being tracked). This value is 
// set if there is a need to track 2 prior values (ex. if there is an
// addition folllowed by a multiplication)
let firstValue = null;
// holds the numerical value of the last data entry (null if there
// is no last data entry being tracked)
let lastValue = null;
// set to true immediately after an equals sign is pressed
let equPressed = false;
// set to true immediately after an operator is pressed
let opPressed = false;

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

// plus-minus button event listener. Changes the sign of the display
// value. If the display value is 0, then it does nothing.
plmBtn.addEventListener("click", function() {
	if (displayVal !== "0") {
		if (displayVal.charAt(0) === "-") {	
			displayVal = displayVal.slice(1);
		}
		else {
			displayVal = "-" + displayVal;
		}
		output(displayVal);	
	}
});

// decimal button event listener. Adds a decimal to the current value
// being displayed as long as there isn't one already
decBtn.addEventListener("click", function() {
	if (!hasDecimal) {
		hasDecimal = true;
		displayChar(".");
	}
});

// clear button event listener. Total reset to the calculation. Sets 
// the display value to 0 and "forgets" any calculation currently 
// taking place
clrBtn.addEventListener("click", function() {
	displayVal = "0";
	hasDecimal = false;	
	firstOperator = NO_OP;
	lastOperator = NO_OP;
	firstValue = null;
	lastValue = null;
	opPressed = false;
	equPressed = false;
	displayText.nodeValue = displayVal;
});

// handles addition / subtraction operations. Action is
// dependent on the state of the calculation. 
function handleAddSub(operator)
{
	// ignore last operator if one was just pressed without a 
	// number being entered afterwards
	if (opPressed)
	{
		if (firstOperator !== NO_OP) {	
			lastOperator = firstOperator;
			firstOperator = NO_OP;
			lastValue = operate(lastOperator, firstValue, lastValue);
		}	
	}	

	else {
		let newValue = +displayVal;
		if (firstValue !== null) {	
			let firstRes = operate(lastOperator, lastValue, newValue);
			let totalRes = operate(firstOperator, firstValue, firstRes);
			firstValue = null;
			lastValue = totalRes;
			firstOperator = NO_OP;	
		}
		else if (lastValue !== null) {
			let res = operate(lastOperator, lastValue, newValue);
			lastValue = res;	
		} 
		else {	
			lastValue = newValue;	
		}
		if (equPressed) {	
			equPressed = false;
		}
	}

	lastOperator = operator;
	displayVal = lastValue.toString();
	output(displayVal);
	opPressed = true;
	hasDecimal = false;
}

// addition button event listener. 
addBtn.addEventListener("click", function() {
	handleAddSub(PLUS);	
});

// subtraction button event listener.
subBtn.addEventListener("click", function() {
	handleAddSub(MINUS);
});

// Handles action following the multiplication, division, or
// modulo button being pressed
function handleMulDivMod(operator) {
	// if another operator is pressed immediately before this, nothing
	// needs to be done other than what is handled after this if 
	// statement (i.e. essentially the last operator is ignored
	// and replaced with the new operator)
	if (!opPressed) {
		let newValue = +displayVal;
		// two previous operations
		if (firstOperator !== NO_OP) {
			let firstRes = operate(lastOperator, lastValue, newValue);
			let totalRes = operate(firstOperator, firstValue, firstRes);
			lastValue = totalRes;
			firstOperator = NO_OP;
			firstValue = null;
		}
		// one previous operation
		else if (lastOperator !== NO_OP) {
			// if the last operation was a plus or minus, then can't evaluate
			// yet to respect order of operations
			if (lastOperator === PLUS || lastOperator === MINUS) {
				firstOperator = lastOperator;
				firstValue = lastValue;
				lastValue = newValue;
			}
			else {
				let res = operate(lastOperator, lastValue, newValue);
				lastValue = res;
			}
		}	
		// no previous operations
		else {
			lastValue = newValue;
		}
		if (equPressed) {	
			equPressed = false;
		}
	}

	lastOperator = operator;
	displayVal = lastValue.toString();
	output(displayVal);
	opPressed = true;
	hasDecimal = false;
}


// multiplication button event listener
mulBtn.addEventListener("click", function() {
	handleMulDivMod(TIMES);
});

// division button event listener
divBtn.addEventListener("click", function() {
	handleMulDivMod(DIV);
});

// modulo button event listener
modBtn.addEventListener("click", function() {
	handleMulDivMod(MOD);
});

// equals button event listener.
equBtn.addEventListener("click", function() {
	// if an operator was just pressed, prior to pressing equals, 
	// ignore that operator
	if (opPressed) {	
		if (firstOperator !== NO_OP) {
			let res = operate(firstOperator, firstValue, lastValue);
			lastValue = res;
		}
		opPressed = false;
	}	

	else {
		newValue = +displayVal;
		if (firstOperator !== NO_OP) {
			let firstRes = operate(lastOperator, lastValue, newValue);
			let totalRes = operate(firstOperator, firstValue, firstRes);
			lastValue = totalRes;
		}	
		else if (lastOperator !== NO_OP) {	
			let res = operate(lastOperator, lastValue, newValue);
			lastValue = res;	
		}
		else {
			lastValue = newValue;
		}
	}

	displayVal = lastValue.toString();
	output(displayVal);
	firstValue = null;
	lastValue = null;
	firstOperator = NO_OP;
	lastOperator = NO_OP;
	hasDecimal = false;
	equPressed = true;	
});

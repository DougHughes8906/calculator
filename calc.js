
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
	if (b === 0) {
		notANumber = true;
	}
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

// outputs a string to the calculator display. However, if the current
// calculation is NaN, then no matter what, Not a number is output. This
// can only be reset by the user pressing the clear button 
function output(value) {
	if (notANumber) {
		displayText.nodeValue = "Not a number";
	}
	else {
		// the max/min values after which exponential notation is used
		const maxNonExp = 10**12 - 1;
		const minNonExp = 10**-11;
		// max number of digits after which point the output is rounded
		const maxDigits = 15;
		// if value is negative, handle as if positive and then add negative
		// sign back at end
		let isNeg = false;	
		if (value.charAt(0) === "-") {
			isNeg = true;
			value = value.slice(1);
		}
		let valNum = +value;
			
		if (opPressed || equPressed) {		
			if (valNum >= maxNonExp || (valNum <= minNonExp && valNum !== 0)) {	
				value = valNum.toExponential(12);	
			}
			else if (value.length - 1 > maxDigits) {
				let decimalPlace = value.indexOf(".");
				let decimalDigits = maxDigits - decimalPlace;	
				value = valNum.toFixed(decimalDigits);					
			}
		}
		if (isNeg) {
					value = "-" + value;
		}
		displayText.nodeValue = value;
	}	
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
// holds true if the current value being displayed already has
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
// set to true if the current value of the calculation is not a number
// (i.e. this is set after a division by 0)
let notANumber = false;

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

// functions for actions taken when each numerical button is
// pressed (add the relevant number to the value being displayed
// on the screen)

function pressZero() {
	displayChar("0");
}

function pressOne() {
	displayChar("1");
}

function pressTwo() {
	displayChar("2");
}

function pressThree() {
	displayChar("3");
}

function pressFour() {
	displayChar("4");
}

function pressFive() {
	displayChar("5");
}

function pressSix() {
	displayChar("6");
}

function pressSeven() {
	displayChar("7");
}

function pressEight() {
	displayChar("8");
}

function pressNine() {
	displayChar("9");
}

// event listeners for each of the number buttons which add the 
// relevant number to the display when clicked
zeroBtn.addEventListener("click", function() { pressZero(); });
oneBtn.addEventListener("click", function() { pressOne(); });
twoBtn.addEventListener("click", function() { pressTwo(); });
threeBtn.addEventListener("click", function() { pressThree(); });
fourBtn.addEventListener("click", function() { pressFour(); });
fiveBtn.addEventListener("click", function() { pressFive(); });
sixBtn.addEventListener("click", function() { pressSix(); });
sevenBtn.addEventListener("click", function() { pressSeven(); });
eightBtn.addEventListener("click", function() { pressEight(); });
nineBtn.addEventListener("click", function() { pressNine(); });

// Presses plus-minus button. Changes the sign of the display
// value. If the display value is 0, then it does nothing.
function pressPlusMinus() {
	if (displayVal !== "0") {
		if (displayVal.charAt(0) === "-") {	
			displayVal = displayVal.slice(1);
		}
		else {
			displayVal = "-" + displayVal;
		}
		output(displayVal);	
	}
}

// plus-minus button click event listener. 
plmBtn.addEventListener("click", function() {
	pressPlusMinus();	
});


// Adds a decimal to the current value being displayed as long as 
// there isn't one already
function pressDecimal() {
	if (!hasDecimal) {
		hasDecimal = true;
		displayChar(".");
	}
}

// decimal button click event listener. 
decBtn.addEventListener("click", function() {
	pressDecimal();	
});

// Total reset to the calculation. Sets the display value to 0 
// and "forgets" any calculation currently taking place
function pressClear() {
	displayVal = "0";
	hasDecimal = false;	
	firstOperator = NO_OP;
	lastOperator = NO_OP;
	firstValue = null;
	lastValue = null;
	opPressed = false;
	equPressed = false;
	notANumber = false;
	output(displayVal);
}

// clear button click event listener. 
clrBtn.addEventListener("click", function() {
	pressClear();		
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
	opPressed = true;
	hasDecimal = false;
	output(displayVal);	
}

// performs the action of pressing the addition button
function pressAdd() {
	handleAddSub(PLUS);
}

// addition button click event listener. 
addBtn.addEventListener("click", function() {
	pressAdd();	
});

// performs the action of pressing the subtraction button
function pressSub() {
	handleAddSub(MINUS);
}

// subtraction button event listener.
subBtn.addEventListener("click", function() {
	pressSub();	
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
	opPressed = true;
	hasDecimal = false;
	output(displayVal);		
}

// performs the action of pressing the multiplication button
function pressMult() {
	handleMulDivMod(TIMES);	
}

// multiplication button click event listener
mulBtn.addEventListener("click", function() {
	pressMult();	
});

// performs the action of pressing the division button
function pressDiv() {
	handleMulDivMod(DIV);
}

// division button click event listener
divBtn.addEventListener("click", function() {
	pressDiv();	
});

// performs the action of pressing the modulo button
function pressMod() {
	handleMulDivMod(MOD);
}

// modulo button click event listener
modBtn.addEventListener("click", function() {
	pressMod();	
});

// performs the action of pressing the equals button
function pressEquals() {
	// if an operator was just pressed, prior to pressing equals, 
	// ignore that operator
	if (opPressed) {	
		if (firstOperator !== NO_OP) {
			let res = operate(firstOperator, firstValue, lastValue);
			lastValue = res;
		}
		opPressed = false;
	}	
	// a value was entered immediately prior to pressing equals
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
	equPressed = true;
	firstValue = null;
	lastValue = null;
	firstOperator = NO_OP;
	lastOperator = NO_OP;
	hasDecimal = false;	
	output(displayVal);
}

// equals button click event listener.
equBtn.addEventListener("click", function() {
	pressEquals();	
});


// holds true if the user is currently holding shift
let isShifted = false;
// holds true if the key was entered with a shift
let shiftedVal = false;
// holds the value of the key that was pressed down
let keyValue = null;
// if the input value was shifted, holds the unshifted value of
// that key (as a .key value). Otherwise holds nothing
let unshiftVal = null;

// event listener for keyboard keydown action. On keydown, the styling
// of the relevant button is changed, but no action is taken on the 
// calculation until keyup. Only allows one key on the calculator to 
// be down at a time.

document.addEventListener("keydown", function(event) {
	console.log(`Keydown: ${event.key} / Keycode: ${event.keyCode}`);
	if (keyValue === null) {
		pressedVal = event.key || event.keyCode;
		if (!isShifted) {
			if (pressedVal === "Shift" || pressedVal === 16) {
				isShifted = true;
			}
			else if (pressedVal === "0" || pressedVal === 48) {
				zeroBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;	
			}
			else if (pressedVal === "1" || pressedVal === 49) {
				oneBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;	
			}
			else if (pressedVal === "2" || pressedVal === 50) {
				twoBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;
			}
			else if (pressedVal === "3" || pressedVal === 51) {
				threeBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;
			}
			else if (pressedVal === "4" || pressedVal === 52) {
				fourBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;
			}
			else if (pressedVal === "5" || pressedVal === 53) {
				fiveBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;
			}
			else if (pressedVal === "6" || pressedVal === 54) {
				sixBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;
			}
			else if (pressedVal === "7" || pressedVal === 55) {
				sevenBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;
			}
			else if (pressedVal === "8" || pressedVal === 56) {
				eightBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;
			}
			else if (pressedVal === "9" || pressedVal === 57) {
				nineBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;
			}
			else if (pressedVal === "." || pressedVal === 190) {
				decBtn.classList.toggle("activeOperand");
				keyValue = pressedVal;
			}
			else if (pressedVal === "=" || pressedVal === 187 
				|| pressedVal === "Enter" || pressedVal === 13) {
				equBtn.classList.toggle("activeEquals");
				keyValue = pressedVal;
			}
			else if (pressedVal === "c" || pressedVal === 187) {
				clrBtn.classList.toggle("activeClear");
				keyValue = pressedVal;
			}
			else if (pressedVal === "/" || pressedVal === 191) {
				divBtn.classList.toggle("activeOperator");
				keyValue = pressedVal;
			}
			else if (pressedVal === "-" || pressedVal === 189) {
				subBtn.classList.toggle("activeOperator");
				keyValue = pressedVal;
			}
			else if (pressedVal === "n" || pressedVal === 78) {
				plmBtn.classList.toggle("activeOperator");
				keyValue = pressedVal;
			}
		}

		// shifted values
		else {
			if (pressedVal === "%" || pressedVal === 53) {
				modBtn.classList.toggle("activeOperator");
				keyValue = pressedVal;
				shiftedVal = true;
				unshiftVal = "5";				
			}
			else if (pressedVal === "*" || pressedVal === 56) {
				mulBtn.classList.toggle("activeOperator");
				keyValue = pressedVal;
				shiftedVal = true;
				unshiftVal = "8";				
			}
			else if (pressedVal === "+" || pressedVal === 187) {
				addBtn.classList.toggle("activeOperator");
				keyValue = pressedVal;
				shiftedVal = true;
				unshiftVal = "=";
			}	
		}
	}		
});

// resets the two variables used to track input
function resetInput() {
	keyValue = null;	
	shiftedVal = false;
}		

// event listener for keyboard keyup action. On keyup the original 
// styling for the button is returned and the actual action of pressing
// the button is taken. 

document.addEventListener("keyup", function(event) {
	console.log(`Keyup: ${event.key} / Keycode: ${event.keyCode}`);
	let upValue = event.key || event.keyCode;

	if (upValue === "Shift" || upValue === 16) {
		isShifted = false;
	}
	
	else if (upValue === keyValue || upValue === unshiftVal) {
		if (!shiftedVal) {
			if (keyValue === "0" || keyValue === 48) {
				zeroBtn.classList.toggle("activeOperand");
				pressZero();	
			}
			else if (keyValue === "1" || keyValue === 49) {
				oneBtn.classList.toggle("activeOperand");
				pressOne();	
			}
			else if (keyValue === "2" || keyValue === 50) {
				twoBtn.classList.toggle("activeOperand");
				pressTwo();
			}
			else if (keyValue === "3" || keyValue === 51) {
				threeBtn.classList.toggle("activeOperand");
				pressThree();
			}
			else if (keyValue === "4" || keyValue === 52) {
				fourBtn.classList.toggle("activeOperand");
				pressFour();
			}
			else if (keyValue === "5" || keyValue === 53) {
				fiveBtn.classList.toggle("activeOperand");
				pressFive();
			}
			else if (keyValue === "6" || keyValue === 54) {
				sixBtn.classList.toggle("activeOperand");
				pressSix();
			}
			else if (keyValue === "7" || keyValue === 55) {
				sevenBtn.classList.toggle("activeOperand");
				pressSeven();
			}
			else if (keyValue === "8" || keyValue === 56) {
				eightBtn.classList.toggle("activeOperand");
				pressEight();
			}
			else if (keyValue === "9" || keyValue === 57) {
				nineBtn.classList.toggle("activeOperand");
				pressNine();
			}
			else if (keyValue === "." || keyValue === 190) {
				decBtn.classList.toggle("activeOperand");
				pressDecimal();
			}
			else if (keyValue === "=" || keyValue === 187
				|| keyValue === "Enter" || keyValue === 13) {
				equBtn.classList.toggle("activeEquals");
				pressEquals();
			}
			else if (keyValue === "-" || keyValue === 189) {
				subBtn.classList.toggle("activeOperator");
				pressSub();
			}
			else if (keyValue === "/" || keyValue === 191) {
				divBtn.classList.toggle("activeOperator");
				pressDiv();
			}
			else if (keyValue === "c" || keyValue === 67) {
				clrBtn.classList.toggle("activeClear");
				pressClear();
			}
			else if (keyValue === "n" || keyValue === 78) {
				plmBtn.classList.toggle("activeOperator");
				pressPlusMinus();
			}
		}
		// the input value was shifted
		else {
			if (keyValue === "%" || keyValue === 53) {
				modBtn.classList.toggle("activeOperator");
				pressMod();
			} 
			else if (keyValue === "*" || keyValue === 56) {
				mulBtn.classList.toggle("activeOperator");
				pressMult();
			}
			else if (keyValue === "+" || keyValue === 187) {
				addBtn.classList.toggle("activeOperator");
				pressAdd();
			}
		}
		// reset the variables associated with tracking the
		// input
		keyValue = null;
		shiftedVal = false;
		unshiftVal = null;
	}	
});


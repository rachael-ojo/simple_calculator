const result = document.getElementById("result");
const numberButtons = document.querySelectorAll(".number-btn");

let justCalculated = false;


// Number and calculator button functionality
numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (button.textContent === "=") {

            calculate();

        } else {

            addToDisplay(button.textContent);

        }

    });

});


// Clear function
function clearDisplay() {
    result.value = "";
    result.style.fontSize = "28px";
}


// Clear button
const clear = document.getElementById("clear");

clear.addEventListener("click", function() {
    result.value = "";
    result.style.fontSize = "28px";
});


// Backspace function
function backspace() {

    if (result.value === "Error") {

        result.value = "";

    } else {

        result.value = result.value.slice(0, -1);

    }

}


// Backspace button
const backspaceButton = document.getElementById("backspace");

backspaceButton.addEventListener("click", function() {

    backspace();

});


// Calculate function
function calculate() {

    if (result.value === "") {
        return;
    }

    try {

        const answer = eval(result.value);

        if (!Number.isFinite(answer)) {

            result.value = "Error";
            justCalculated = false;
            return;

        }

        result.value = answer;
        justCalculated = true;

    } catch {

        result.value = "Error";
        justCalculated = false;

    }

}


// Keyboard functionality
document.addEventListener("keydown", function(event) {

    console.log("Key pressed:", event.key);


    // Numbers and operators
    if ("0123456789+-*/.".includes(event.key)) {

        addToDisplay(event.key);


    // Enter key
    } else if (event.key === "Enter") {

        event.preventDefault();
        calculate();


    // Backspace key
    } else if (event.key === "Backspace") {

        backspace();


    // Escape key
    } else if (event.key === "Escape") {

        clearDisplay();

    }

});

// Add value to display
function addToDisplay(value) {

    // If display says Error, start fresh
    if (result.value === "Error") {
        result.value = "";
    }

    // After a calculation, typing a number starts a new calculation
    if (justCalculated && !"+-*/".includes(value)) {
        result.value = "";
    }

    justCalculated = false;

    const lastCharacter = result.value.slice(-1);

    // Limit each number to 15 digits
    const currentNumber = result.value.split(/[\+\-\*\/]/).pop();

    if (
        "0123456789".includes(value) &&
        currentNumber.replace(".", "").length >= 15
    ) {
        return;
    }

    // Prevent +, * and / from being the first character
    if (result.value === "" && "+*/".includes(value)) {
        return;
    }

    // Prevent two operators together
    if ("+-*/".includes(lastCharacter) && "+-*/".includes(value)) {
        return;
    }

    // Prevent more than one decimal point in the same number
    if (
        value === "." &&
        result.value.split(/[\+\-\*\/]/).pop().includes(".")
    ) {
        return;
    }

    // Add the value
    result.value += value;
}
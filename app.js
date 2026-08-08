const result = document.getElementById("result");
const numberButtons = document.querySelectorAll(".number-btn");


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


// Clear button
const clear = document.getElementById("clear");

clear.addEventListener("click", function() {
    result.value = "";
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

        result.value = eval(result.value);

    } catch {

        result.value = "Error";
    }
}


// Keyboard functionality
document.addEventListener("keydown", function(event) {

    if ("0123456789+-*/.".includes(event.key)) {

        addToDisplay(event.key);

    } else if (event.key === "Enter") {

        event.preventDefault();
        calculate();

    } else if (event.key === "Backspace") {

        backspace();
    }
});

// Add value to display
function addToDisplay(value) {

    if (result.value === "Error") {

        result.value = "";
    }

    const lastCharacter = result.value.slice(-1);

    // Prevent two operators from being entered together
    if ("+-*/".includes(lastCharacter) && "+-*/".includes(value)) {

        return;
    }

    result.value += value;
}
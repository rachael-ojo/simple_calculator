const result = document.getElementById("result");
const numberButtons = document.querySelectorAll(".number-btn");

numberButtons.forEach(function(button) {
    button.addEventListener("click", function () {
        
        if (button.textContent === "=") {

            if (result.value === "") {

                // Do nothing
                
            } else {

            result.value = eval(result.value);

        } else {
            result.value += button.textContent;
        }
    });
});

const clear = document.getElementById("clear");

clear.addEventListener("click", function () {
result.value = "";
            
});


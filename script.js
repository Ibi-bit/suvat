
var dispalcementInput = document.getElementById("s");
var initialVelocityInput = document.getElementById("u");
var finalVelocityInput = document.getElementById("v");
var accelerationInput = document.getElementById("a");
var timeInput = document.getElementById("t");

dispalcementInput.addEventListener("input", calculateValues);
initialVelocityInput.addEventListener("input", calculateValues);
finalVelocityInput.addEventListener("input", calculateValues);
accelerationInput.addEventListener("input", calculateValues);
timeInput.addEventListener("input", calculateValues);


var calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", calculateValues);

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function() {
    dispalcementInput.value = "";
    initialVelocityInput.value = "";
    finalVelocityInput.value = "";
    accelerationInput.value = "";
    timeInput.value = "";
});


function calculateValues() {
    var s = parseFloat(dispalcementInput.value);
    var u = parseFloat(initialVelocityInput.value);
    var v = parseFloat(finalVelocityInput.value);
    var a = parseFloat(accelerationInput.value);
    var t = parseFloat(timeInput.value);

    if (!isNaN(u) && !isNaN(a) && !isNaN(t) && isNaN(s)) {
        s = u * t + 0.5 * a * t * t;
        dispalcementInput.value = s.toFixed(2);
    }
    else if (!isNaN(u) && !isNaN(v) && !isNaN(t) && isNaN(a)) {
        a = (v - u) / t;
        accelerationInput.value = a.toFixed(2);
    }
    else if (!isNaN(s) && !isNaN(u) && !isNaN(t) && isNaN(a)) {
        a = (2 * (s - u * t)) / (t * t);
        accelerationInput.value = a.toFixed(2);
    }
    else if (!isNaN(s) && !isNaN(a) && !isNaN(t) && isNaN(u)) {
        u = (s - 0.5 * a * t * t) / t;
        initialVelocityInput.value = u.toFixed(2);
    }
    else if (!isNaN(v) && !isNaN(a) && !isNaN(t) && isNaN(u)) {
        u = v - a * t;
        initialVelocityInput.value = u.toFixed(2);
    }
    else if (!isNaN(s) && !isNaN(u) && !isNaN(a) && isNaN(t)) {
        var discriminant = u * u + 2 * a * s;
        if (discriminant >= 0) {
            var root1 = (-u + Math.sqrt(discriminant)) / a;
            var root2 = (-u - Math.sqrt(discriminant)) / a;
            t = Math.max(root1, root2);
            timeInput.value = t.toFixed(2);
        }
    }
    else if (!isNaN(v) && !isNaN(u) && !isNaN(a) && isNaN(t)) {
        t = (v - u) / a;
        timeInput.value = t.toFixed(2);
    }
    else if (!isNaN(s) && !isNaN(v) && !isNaN(a) && isNaN(u)) {
        var discriminant = v * v - 2 * a * s;
        if (discriminant >= 0) {
            var root1 = (v + Math.sqrt(discriminant)) / a;
            var root2 = (v - Math.sqrt(discriminant)) / a;
            u = Math.min(root1, root2);
            initialVelocityInput.value = u.toFixed(2);
        }
    }
    else if (!isNaN(s) && !isNaN(v) && !isNaN(t) && isNaN(u)) {
        u = (2 * s / t) - v;
        initialVelocityInput.value = u.toFixed(2);
    }
    else if (!isNaN(s) && !isNaN(u) && !isNaN(v) && isNaN(a)) {
        a = (v * v - u * u) / (2 * s);
        accelerationInput.value = a.toFixed(2);
    }
    else if (!isNaN(s) && !isNaN(v) && !isNaN(a) && isNaN(t)) {
        var discriminant = v * v - 2 * a * s;
        if (discriminant >= 0) {
            var root1 = (v - Math.sqrt(discriminant)) / a;
            var root2 = (v + Math.sqrt(discriminant)) / a;
            t = Math.max(root1, root2);
            timeInput.value = t.toFixed(2);
        }
    }
    else if (!isNaN(u) && !isNaN(v) && !isNaN(t) && isNaN(s)) {
        s = ((u + v) / 2) * t;
        dispalcementInput.value = s.toFixed(2);
    }
    else{
        document.getElementById("output").textContent = "Please provide at least three known values to calculate the unknowns.";
    }
}

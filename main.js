function squareroot(input_number, initial_guess, limit) {
    var r = initial_guess;
    for (var j = 1; j <= limit; j += 1) {
        r = r - ((Math.pow(r, 2) - input_number) / (2 * r));
    }
    return r;
}
console.log(squareroot(100, 3, 800));
// A class to house our diagram drawing logic
var Diagram = /** @class */ (function () {
    // Code to run when we initialize the Diagram
    function Diagram(number_root) {
        this.canvas = document.getElementById("myid");
        this.drawing_context = this.canvas.getContext("2d");
        this.number_root = number_root;
        this.update();
    }
    Diagram.prototype.update = function () {
        this.drawing_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // The line to draw
        this.drawing_context.strokeStyle = "#000000";
        this.drawing_context.lineWidth = 1;
        // X-axis
        this.drawing_context.beginPath();
        this.drawing_context.lineTo(0, 250);
        this.drawing_context.lineTo(500, 250);
        this.drawing_context.stroke();
        this.drawing_context.closePath();
        // Y-axis
        this.drawing_context.beginPath();
        this.drawing_context.lineTo(250, 0);
        this.drawing_context.lineTo(250, 500);
        this.drawing_context.stroke();
        this.drawing_context.closePath();
        // The line to draw
        this.drawing_context.strokeStyle = "#0077cc";
        this.drawing_context.lineWidth = 5;
        this.drawing_context.beginPath();
        for (var x = -500; x <= 500; x += 1) {
            var y = Math.pow(x, 2) - this.number_root;
            this.drawing_context.lineTo(x * 10 + 250, -y + 250);
        }
        this.drawing_context.stroke();
        this.drawing_context.closePath();
    };
    return Diagram;
}());
var main_diagram = new Diagram(10);
function update_viewer() {
    var rootnumber = document.getElementById("rootnumber");
    var iterations = document.getElementById("iterations");
    if (isNaN(Number(rootnumber.value))) {
        document.getElementById("badrootnumber").style.display = "block";
        document.getElementById("badrootnumber").innerText = rootnumber.value + " is not a valid number!";
    }
    else {
        document.getElementById("badrootnumber").style.display = "none";
        main_diagram.number_root = Number(rootnumber.value);
        main_diagram.update();
    }
}
//# sourceMappingURL=main.js.map
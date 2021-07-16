function squareroot(input_number, initial_guess, limit) {
    var r = initial_guess;
    for (var j = 1; j <= limit; j += 1) {
        r = r - ((Math.pow(r, 2) - input_number) / (2 * r));
    }
    return r;
}
// A class to house our diagram drawing logic
var Diagram = /** @class */ (function () {
    // Code to run when we initialize the Diagram
    function Diagram(number_root) {
        this.MAX_X = 700;
        this.MAX_Y = 700;
        this.SCALE_X = 50;
        this.SCALE_Y = 15;
        this.canvas = document.getElementById("myid");
        this.drawing_context = this.canvas.getContext("2d");
        this.number_root = number_root;
        this.initial_guess = 5;
        this.update();
    }
    Diagram.prototype.update = function () {
        this.drawing_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawing_context.setLineDash([1, 0]);
        this.drawAxes();
        // The line to draw
        this.drawing_context.strokeStyle = "#0077cc";
        this.drawing_context.lineWidth = 5;
        this.drawing_context.beginPath();
        for (var x = -this.MAX_X; x <= this.MAX_X; x += 0.2) {
            var y = Math.pow(x, 2) - this.number_root;
            this.drawing_context.lineTo(this.scaleX(x), this.scaleY(y));
        }
        this.drawing_context.stroke();
        this.drawing_context.closePath();
        // Initial guess
        this.drawing_context.strokeStyle = "#ff0000";
        this.drawing_context.lineWidth = 2;
        this.drawing_context.beginPath();
        this.drawing_context.lineTo(this.scaleX(this.initial_guess), this.MAX_Y / 2);
        this.drawing_context.lineTo(this.scaleX(this.initial_guess), this.scaleY(Math.pow(this.initial_guess, 2) - this.number_root));
        this.drawing_context.stroke();
        this.drawing_context.closePath();
        this.drawTangent(this.initial_guess);
    };
    Diagram.prototype.drawTangent = function (x) {
        this.drawing_context.setLineDash([2, 3]);
        this.drawing_context.strokeStyle = "#000000";
        // y - y1 = m(x - x1)
        // y = m(x - x1) + y1
        var m = 2 * x;
        var y1 = Math.pow(x, 2) - this.number_root;
        var yLeft = m * (-this.MAX_X - x) + y1;
        var yRight = m * (this.MAX_X - x) + y1;
        this.drawing_context.beginPath();
        this.drawing_context.lineTo(this.scaleX(-this.MAX_X), this.scaleY(yLeft));
        this.drawing_context.lineTo(this.scaleX(this.MAX_X), this.scaleY(yRight));
        this.drawing_context.stroke();
        this.drawing_context.closePath();
    };
    Diagram.prototype.drawAxes = function () {
        // The line to draw
        this.drawing_context.strokeStyle = "#000000";
        this.drawing_context.lineWidth = 1;
        // X-axis
        this.drawing_context.beginPath();
        this.drawing_context.lineTo(0, this.MAX_Y / 2);
        this.drawing_context.lineTo(this.MAX_X, this.MAX_Y / 2);
        this.drawing_context.stroke();
        this.drawing_context.closePath();
        // Y-axis
        this.drawing_context.beginPath();
        this.drawing_context.lineTo(this.MAX_X / 2, 0);
        this.drawing_context.lineTo(this.MAX_X / 2, this.MAX_Y);
        this.drawing_context.stroke();
        this.drawing_context.closePath();
        // Ticks on the x-axis
        for (var x = -this.MAX_X; x <= this.MAX_X; x += 1) {
            this.drawing_context.beginPath();
            this.drawing_context.lineTo(this.scaleX(x), this.MAX_Y / 2);
            this.drawing_context.lineTo(this.scaleX(x), this.MAX_Y / 2 + 5);
            this.drawing_context.stroke();
            this.drawing_context.closePath();
        }
        // Ticks on the y-axis
        for (var y = -this.MAX_Y; y <= this.MAX_Y; y += 1) {
            this.drawing_context.beginPath();
            this.drawing_context.lineTo(this.MAX_Y / 2, this.scaleY(y));
            this.drawing_context.lineTo(this.MAX_Y / 2 - 5, this.scaleY(y));
            this.drawing_context.stroke();
            this.drawing_context.closePath();
        }
    };
    Diagram.prototype.scaleX = function (x) {
        return x * this.SCALE_X + (this.MAX_X / 2);
    };
    Diagram.prototype.scaleY = function (y) {
        return -(y * this.SCALE_Y) + (this.MAX_Y / 2);
    };
    return Diagram;
}());
var main_diagram = new Diagram(10);
function update_viewer() {
    // Set root number
    var rootnumber = document.getElementById("rootnumber");
    if (isNaN(Number(rootnumber.value))) {
        document.getElementById("bad_root_number").style.display = "block";
        document.getElementById("bad_root_number").innerText = rootnumber.value + " is not a valid number!";
    }
    else {
        document.getElementById("bad_root_number").style.display = "none";
        main_diagram.number_root = Number(rootnumber.value);
    }
    // Set initial guess
    var initial_guess = document.getElementById("initial_guess");
    if (isNaN(Number(initial_guess.value))) {
        document.getElementById("bad_initial_guess").style.display = "block";
        document.getElementById("bad_initial_guess").innerText = initial_guess.value + " is not a valid number!";
    }
    else {
        document.getElementById("bad_initial_guess").style.display = "none";
        main_diagram.initial_guess = Number(initial_guess.value);
    }
    // Set iterations
    var iterations = document.getElementById("iterations");
    main_diagram.iterations = Number(iterations.value);
    document.getElementById("iterations_number").innerText = iterations.value;
    // Do + generate
    document.getElementById("return_value").innerText = String(squareroot(main_diagram.number_root, main_diagram.initial_guess, main_diagram.iterations));
    main_diagram.update();
}
//# sourceMappingURL=main.js.map
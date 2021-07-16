function squareroot(input_number : number, initial_guess : number, limit : number) : number {
    let r : number = initial_guess;
    for (let j : number = 1; j <= limit; j += 1) {
        r = r - ((r**2 - input_number) / (2 * r));
    }
    return r;
}

console.log(squareroot(100, 3, 800));

// A class to house our diagram drawing logic
class Diagram {

    private canvas : HTMLCanvasElement;                 // The canvas
    private drawing_context : CanvasRenderingContext2D; // The context (line width, color etc.)

    private number_root : number;

    // Code to run when we initialize the Diagram
    constructor(number_root : number) {
        this.canvas = document.getElementById("myid") as HTMLCanvasElement;
        this.drawing_context = this.canvas.getContext("2d");

        this.number_root = number_root;
        this.update();
    }

    private update() {
        this.drawing_context.beginPath();
        this.drawing_context.lineTo(0, 250);
        this.drawing_context.lineTo(500, 250);
        this.drawing_context.stroke();
        this.drawing_context.closePath();

        this.drawing_context.beginPath();
        this.drawing_context.lineTo(250, 0);
        this.drawing_context.lineTo(250, 500);
        this.drawing_context.stroke();
        this.drawing_context.closePath();

        this.drawing_context.strokeStyle = "#0077cc";
        this.drawing_context.lineWidth = 5;

        this.drawing_context.beginPath();
        for (let x : number = -500; x <= 500; x+=1){
            let y : number = x**2 - this.number_root;
            this.drawing_context.lineTo(x * 10 + 250, -y + 250);
        }
        this.drawing_context.stroke();
        this.drawing_context.closePath();
    }
}

new Diagram(10);
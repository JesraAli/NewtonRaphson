var message = "Hello world";
console.log(message);
function squareroot(thenumbertofindtherootof, guess, limit) {
    var r = guess;
    for (var j = 1; j <= limit; j += 1) {
        r = r - ((Math.pow(r, 2) - thenumbertofindtherootof) / (2 * r));
    }
    console.log(r);
}
squareroot(10, 3, 800);

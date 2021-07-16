function squareroot(input_number : number, initial_guess : number, limit : number) : number {
    let r : number = initial_guess;
    for (let j : number = 1; j <= limit; j += 1) {
        r = r - ((r**2 - input_number) / (2 * r));
    }
    return r;
}

console.log(squareroot(10, 3, 800));

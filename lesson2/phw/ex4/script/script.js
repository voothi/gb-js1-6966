let a = 4;
let b = 2;

function mathOpsAddition(a, b) {
    return a + b;
}

function mathOpsSubtraction(a, b) {
    return a - b;
}

function mathOpsMultiplication(a, b) {
    return a * b;
}

function mathOpsDivision(a, b) {
    if (b == 0) {
        return "На нуль не делится";
    } else {
        return a / b;
    }

}

console.log(
    `
a = ${a}, b = ${b}
Сложение: ${mathOpsAddition(a, b)}
Вычитание: ${mathOpsSubtraction(a, b)}
Умножение: ${mathOpsMultiplication(a, b)}
Деление: ${mathOpsDivision(a, b)}
Деление на нуль: ${mathOpsDivision(a, 0)}
    `
);

// export default mathOpsAddition;
// export default mathOpsSubtraction;
// export default mathOpsMultiplication;
// export default mathOpsMultiplication;
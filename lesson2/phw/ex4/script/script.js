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
        return "На ноль не делится";
    } else {
        return a / b;
    }

}

console.log(
    `
a = ${a}, b = ${b}
Сложение ${mathOpsAddition(a, b)}
Вычитание ${mathOpsSubtraction(a, b)}
Умножение ${mathOpsMultiplication(a, b)}
Деление ${mathOpsDivision(a, b)}
    `
);

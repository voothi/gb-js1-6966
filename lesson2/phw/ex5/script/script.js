let a = 4;
let b = 2;
let operation = "3";

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

/**
 * В зависимости от
 * переданного значения операции выполняет одну из арифметических
 * операций
 * @param {number} arg1 
 * @param {number} arg2 
 * @param {string} operation Операция "+", "-", "*", "/"
 * @returns {number} Результат операции
 */
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case "+":
            return mathOpsAddition(arg1, arg2);
            break;
        case "-":
            return mathOpsSubtraction(arg1, arg2);
            break;
        case "*":
            return mathOpsMultiplication(arg1, arg2);
            break;
        case "/":
            return mathOpsDivision(arg1, arg2);
            break;
        default:
            return "Что это? Попробуйте ещё раз";
    }
}

// console.log(mathOperation(a, b, operation));
console.log(
    `
a = ${a}, b = ${b}
Сложение: ${mathOperation(a, b, "+")}
Вычитание: ${mathOperation(a, b, "-")}
Умножение: ${mathOperation(a, b, "*")}
Деление: ${mathOperation(a, b, "/")}
Деление на нуль: ${mathOperation(a, 0, "/")}
Сложение: ${mathOperation(a, b, "...")}
    `
);
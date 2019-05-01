// Объявить две переменные a и b и задать им целочисленные произвольные начальные значения
let a = 4;
let b = 2;


function calcAandB(a, b) {
    if (a >= 0 && b >= 0) {
        console.log(`a и b больше или равны 0, их разность: ${a - b}`);
    } else if (a < 0 && b < 0) {
        console.log(`a и b строго меньше 0, их произведение: ${a * b}`);
    } else {
        console.log(`a и b разных знаков, их сумма: ${a + b}`);
    }
}

// - если a и b положительные, вывести их разность (ноль можно считать положительным числом);
calcAandB(4, 2);
calcAandB(4, 0);
// - если а и b отрицательные, вывести их произведение;
calcAandB(-4, -2);
// - * (этот пункт по сложнее, делайте по желанию) если а и b разных знаков, вывести их сумму;
calcAandB(-4, 5);
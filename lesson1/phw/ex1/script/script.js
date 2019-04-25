
let tCelsius = null;
let tFahrenheit = null;

tCelsius = prompt("Введите температуру в градусах по Цельсию: ");

console.log(typeof (tCelsius));

if (typeof (tCelsius) == 'number') {
    console.log("is number");
}

// Проверка ввода - только
// Пограничные значения

if (tCelsius == "") {
    alert("Вы не ввели значение - присвоено 0 в градусах по Цельсию");
    tCelsius = 0;
}

tFahrenheit = (9 / 5) * tCelsius + 32;
alert("Температура " + tCelsius + " градусов по Цельсию равна " + tFahrenheit + " градусам по Фаренгейту");
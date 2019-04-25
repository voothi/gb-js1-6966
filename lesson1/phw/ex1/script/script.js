
let tCelsius = null;
let tFahrenheit = null;
let ScaleOfTemperature = "tCelsius";

function tInputUser(ScaleOfTemperature) {
    if (ScaleOfTemperature == "tCelsius") {
        tCelsiusParam = prompt("Введите температуру в градусах по Цельсию: ");
    }
    return tCelsiusParam;
}

function tSetDefault(tCelsiusParam) {
    if (tCelsiusParam == "") {
        alert("Вы не ввели значение - присвоено 0 в градусах по Цельсию");
        tCelsiusParam = 0;
    }
}

function tConvertCelsiusToFahrenheit(tCelsiusParam) {
    return tFahrenheit = (9 / 5) * tCelsiusParam + 32;
}

function tOutputUser(tCelsiusParam, tFahrenheitParam) {
    return alert("Температура " + tCelsiusParam + " градусов по Цельсию равна " + tFahrenheitParam + " градусам по Фаренгейту");
}


tCelsius = tInputUser(ScaleOfTemperature);
tCelsius = tSetDefault(tCelsius);
tFahrenheit = tConvertCelsiusToFahrenheit(tCelsius);
tOutputUser(tCelsius, tFahrenheit);

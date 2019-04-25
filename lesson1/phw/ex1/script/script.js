let tCelsius = null;
let tFahrenheit = null;

tCelsius = tInputUser();
tCelsius = tSetDefault(tCelsius);
tFahrenheit = tConvertCelsiusToFahrenheit(tCelsius);
tOutputUser(tCelsius, tFahrenheit);

function tInputUser() {
    return prompt("Введите температуру в градусах по Цельсию: ");
}

function tSetDefault(tCelsiusParam) {
    if (tCelsiusParam == "") {
        tCelsiusParam = alert("Вы не ввели значение - присвоено 0 в градусах по Цельсию");
        return tCelsiusParam = 0;
    } else {
        return tCelsiusParam;
    }
}

function tConvertCelsiusToFahrenheit(tCelsiusParam) {
    return tFahrenheit = (9 / 5) * tCelsiusParam + 32;
}

function tOutputUser(tCelsiusParam, tFahrenheitParam) {
    return alert("Температура " + tCelsiusParam + " градусов по Цельсию равна " + tFahrenheitParam + " градусам по Фаренгейту");
}
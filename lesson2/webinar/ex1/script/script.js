// Регулярные выражения
let regex = /(https?)(:\/\/)([a-z]+)(.)([a-z]{2,}])/gm;
let str = "asdffdew https://google.ru jklasqwer";
let match = regex.test(str);
console.log(match);
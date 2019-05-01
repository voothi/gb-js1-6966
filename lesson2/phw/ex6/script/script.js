let howMoneyPutToBank = +prompt(
    `
Введите сумму в рублях в виде целого числа для зачисления на счет: 
    `);

/**
 * Функция для проверки на целое число
 * @param {number} howMoneyPutToBank Число
 * @returns {boolean} Целое ли число
 */
function isInteger(howMoneyPutToBank) {
    return (howMoneyPutToBank ^ 0) === howMoneyPutToBank;
}

/**
 * Функция rubleNumEnds склоняет рубли
 * @param {number} howMoneyPutToBank Сумма в рублях, введенная пользователем, целое число
 * @returns {string} Возвращает слово рубль в верном склонении, 
 * в зависимости от последнего символа
 */
function rubleNumEnds(howMoneyPutToBank) {
    let numEnds = getLastSymbol(howMoneyPutToBank)
    switch (numEnds) {
        case '1':
            return 'рубль';
            break;
        case '2':
        case '3':
        case '4':
            return 'рубля';
            break;
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            return 'рублей';
            break;
        default:
            break;
    }
}

/**
 * Функция getLastSymbol ищет и выводит последний символ в переданной строке
 * @param {string} howMoneyPutToBank Принимает сумму, введенную пользователем
 * @returns {string} Возвращает последний символ
 */
function getLastSymbol(howMoneyPutToBank) {
    let numInStr = String(howMoneyPutToBank);
    return numInStr.charAt(numInStr.length - 1);
}

/**
 * Функция messageToUser выводит результат в консоль или в окно, в зависимости от флага
 * @param {string} messageOutTo.consoleLogMessage Флаг для вывода в консоль
 * @param {string} messageOutTo.alarmMessage Флаг для вывода в окно
 * @param {string} messageContent Получает сообщение, которое требуется вывести
 */
function messageToUser(messageOutTo, messageContent) {
    switch (messageOutTo) {
        case 'consoleLogMessage':
            return console.log(messageContent);
            break;
        case 'alarmMessage':
            return alert(messageContent);
            break;
        default:
            break;
    }
}

let messageContent =
    `
Вы внесли на свой счет ${howMoneyPutToBank} ${rubleNumEnds(howMoneyPutToBank)}.
    `;

let messageErrorInput =
    `
Ошибка ввода: ${howMoneyPutToBank}. Попробуйте ещё раз.
Сумма должна быть положительным целым числом. 
    `;

if (isInteger(howMoneyPutToBank) && howMoneyPutToBank >= 0) {
    messageToUser('consoleLogMessage', messageContent);
    messageToUser('alarmMessage', messageContent);
} else {
    messageToUser('consoleLogMessage', messageErrorInput);
    messageToUser('alarmMessage', messageErrorInput);
}
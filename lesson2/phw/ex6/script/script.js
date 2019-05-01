howMoneyPutToBank = prompt("Введите сумму в рублях в виде целого числа для зачисления на счет: ");
// let howMoneyPutToBank = 12345;

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
    //     console.log(
    //         `
    // numInStr 
    // значение: ${numInStr} 
    // тип: ${typeof (numInStr)} 
    // длина: ${numInStr.length}
    // последний символ: ${numInStr.charAt(numInStr.length - 1)}
    //          `
    //     );

    return numInStr.charAt(numInStr.length - 1);
}

// console.log(
//     `
// ${getLastSymbol(howMoneyPutToBank)}
//     `
// );

/**
 * Функция messageToUser выводит результат в консоль или в окно, в зависимости от флага
 * @param {string} messageOutTo.consoleLogMessage Флаг для вывода в консоль
 * @param {string} messageOutTo.alarmMessage Флаг для вывода в окно
 * @param {string} howMoneyPutToBank
 */
function messageToUser(messageOutTo, howMoneyPutToBank) {
    let messageContent =
        `
Вы внесли на свой счет ${howMoneyPutToBank} ${rubleNumEnds(howMoneyPutToBank)}
        `;

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

messageToUser('consoleLogMessage', howMoneyPutToBank);
messageToUser('alarmMessage', howMoneyPutToBank);
// Case
let
// function declaration
function name(params) {
    let dayNum = new Date().getDay();
    let day = '';
    switch (day) {
        case 1:
            day = "Пн";
            break;
        case 2:
            day = "Вт";
            break;
        default:
            console.log("Что это?")
            break;
    }
}
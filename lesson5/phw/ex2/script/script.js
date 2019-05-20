"use strict"

let buttons = document.querySelectorAll("button");

function showMoreText(card) {
    card.img.style.display = 'none';
    const text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';
    card.productName.insertAdjacentHTML('afterend', `<div class="desc">${text}</div>`);
    card.button.innerText = 'Отмена';
}

function hideMoreText(card) {
    card.img.style.display = 'block';
    card.wrap.querySelector('.desc').remove();
    card.button.innerText = 'Подробнее';
}

let handleClick = event => {
    let cardNode = event.target.parentNode;

    let card = {
        wrap: cardNode,
        img: cardNode.querySelector('img'),
        productName: cardNode.querySelector('.productName'),
        button: cardNode.querySelector('button'),
    };

    let textOnButton = card.button.innerText;
    if (textOnButton === "Подробнее") {
        showMoreText(card);
    } else if (textOnButton === "Отмена") {
        hideMoreText(card);
    }
};

buttons.forEach(element => {
    element.addEventListener("click", event => {
        handleClick(event);
    });
});
document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">');

let slider = document.querySelector('.slider');

let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("beforeend", leftArrow);

let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("beforeend", rightArrow);

let sliderImg = document.querySelector('.slider-item img');
let sliderItem = document.querySelector('.slider-item');

let images = {
    /** индекс текущего изображения в массиве images */
    currentIdx: 0,
    /** массив объектов изображений */
    images: [],
    
    /**
     * Инициализация слайдера.
     * @param {[{src: string}]} arr
     */
    init(arr) {
        this.images = arr;
        this.setImage();
        this.setSizes();
    },

    /**
     * Метод устанавливает размеры слайдера на основе значений 
     * data-атрибутов.
     */
    setSizes() {
        let width = slider.getAttribute("data-width");
        let height = slider.getAttribute("data-height");
        if (width !== null && width !== "") {
            slider.style.width = width;
        }
        if (height !== null && height !== "") {
            slider.style.height = height;
        }
    },

    /**
     * Метод ставит на слайдер изображение, слещующее слева,
     * которое находится в массиве объектов images.
     */
    setNextLeftImage() {
        this.currentIdx = this.getLeftIdx();
        this.setImage();
    },

    /**
     * Метод ставит на слайдер изображение, слещующее справа,
     * которое находится в массиве объектов images.
     */
    setNextRightImage() {
        this.currentIdx = this.getRightIdx();
        this.setImage();
    },

    /**
     * Метод меняет значение атрибута src для изображения на слайдере.
     */
    setImage() {
        sliderImg.setAttribute('src', this.images[this.currentIdx].src);
    },

    /**
     * Метод возвращает индекс следующего справа изображения.
     * @returns {number}
     */
    getRightIdx() {
        if (this.currentIdx == this.images.length - 1) {
            return 0;
        }
        return this.currentIdx + 1;
    },

    /**
     * Метод возвращает индекс следующего слева изображения.
     * @returns {number}
     */
    getLeftIdx() {
        if (this.currentIdx == 0) {
            return this.images.length - 1;
        }
        return this.currentIdx - 1;
    },

    /**
     * Метод анимирует пролистывание вправо и ставит новое
     * изображение.
     */
    slideRightAnimation() {
        let backgroundImage = this.images[this.getRightIdx()].src;
        sliderItem.style.backgroundImage = `url(${backgroundImage})`;
        sliderImg.classList.add('slider-goRight');
        setTimeout(function () {
            sliderImg.classList.remove('slider-goRight');
            images.setNextRightImage();
        }, 1000);
    },


    /**
     * Метод анимирует пролистывание влево и ставит новое
     * изображение.
     */
    slideLeftAnimation() {
        let backgroundImage = this.images[this.getLeftIdx()].src;
        sliderItem.style.backgroundImage = `url(${backgroundImage})`;
        sliderImg.classList.add('slider-goLeft');
        setTimeout(function () {
            sliderImg.classList.remove('slider-goLeft');
            images.setNextLeftImage();
        }, 1000);
    }
}

/** Таймер для предотвращения быстрых кликов переключения слайдов. */
let timer = {
    nextClickTime: null,

    /**
     * Кликнуть можно сразу без задержки.
     */
    init() {
        this.nextClickTime = new Date().getTime() - 1;
    },

    /**
     * Следующий клик возможен через секунду.
     */
    setNextClickTime() {
        this.nextClickTime = new Date().getTime() + 1000;
    },

    /**
     * Либо разрешаем кликнуть и ставим задержку еще раз, либо 
     * клик пока не возможен.
     * @returns {boolean} true если клик возможен, иначе false.
     */
    canClick() {
        if (new Date().getTime() > this.nextClickTime) {
            this.setNextClickTime();
            return true;
        }
        return false;
    }
};

timer.init();

leftArrow.addEventListener('click', function () {
    if (timer.canClick()) {
        images.slideLeftAnimation();
    }
});

rightArrow.addEventListener('click', function () {
    if (timer.canClick()) {
        images.slideRightAnimation();
    }
});

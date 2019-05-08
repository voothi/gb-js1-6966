const products = [
    {
        id: 3,
        price: 127,
        photos: [
            "1.jpg",
            "2.jpg",
        ]
    },
    {
        id: 5,
        price: 499,
    },
    {
        id: 10,
        price: 26,
        photos: [
            "3.jpg"
        ]
    },
    {
        id: 8,
        price: 78,
    },
];

const productsWithPhotos = products.filter(
    item => {
        if (item["photos"] && item.photos.length > 0)
            return true;
    });
console.log(productsWithPhotos);

const sortedFromLowPriceToHigh = products.sort(function (item1, item2) {
    if (item1.price < item2.price) {
        return -1;
    }
    if (item1.price > item2.price) {
        return 1;
    }
    return 0;
});
console.log(sortedFromLowPriceToHigh);

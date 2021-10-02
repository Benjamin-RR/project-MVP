function importAll(r) {
    let images = {};
    let arrayOfImageNames = [];
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    // console.log("Images:" , images);
    Object.keys(images).map(image => {
        // console.log("each image:", image)
        arrayOfImageNames.push(image)
    })
    // console.log("Images2:" , Object.keys(images))

    return arrayOfImageNames;
}

const images = importAll(require.context('./gallery', false, /\.(png|jpe?g|svg)$/));

<img src={images['doggy.png']} />

export default importAll;
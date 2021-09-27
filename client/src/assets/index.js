function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    console.log("Images:" , images);
    return images;
}

const images = importAll(require.context('./gallery', false, /\.(png|jpe?g|svg)$/));

<img src={images['doggy.png']} />

export default importAll;
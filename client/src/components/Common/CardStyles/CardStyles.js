// This function will return a color for each data of an individual card that it receives. (using true, verified, and calculation values.)
export const CardStyles = (data) => {
    // console.log("Data inside card styles:" , data)
    let color = `green`;

    // console.log("extra check:", data.capture.true, typeof data.capture.true);

    const percent = Math.floor(((Number(data.capture.true)-(Number(data.capture.false)))*100)/(Number(data.capture.true)))

    // console.log("Percent:" , percent);

    if (data.capture.verified ) {
        color = "royalblue"
        if (data.capture.true > 99) {
            if (percent >= 40) {
                color="Sienna"
            }
            if (percent >= 60) {
                color="Silver"
            }
            if (percent >= 80) {
                color="GoldenRod"
            }
        }
        if (data.capture.true > 999) {
            color="LightSkyBlue"
        }
    } else {
        if (data.capture.false > 6) {
            color=`red`
        }
    }
    console.log("each color:" , color)
    return color;
};
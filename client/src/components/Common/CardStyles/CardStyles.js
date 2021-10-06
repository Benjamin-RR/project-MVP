// This function will return a color for each data of an individual card that it receives. (using true, verified, and calculation values.)
export const CardStyles = (data) => {
    let color = `rgba(0,128,0,1)`;
    const percent = Math.floor(((Number(data.capture.true)-(Number(data.capture.false)))*100)/(Number(data.capture.true)))

    if (data.capture.verified ) {
        color = "rgba(65,105,225,1)"
        if (data.capture.true > 99) {
            if (percent >= 40) {
                color="rgba(160,82,45,1)"
            }
            if (percent >= 60) {
                color="rgba(192,192,192,1)"
            }
            if (percent >= 80) {
                color="rgba(218,165,32,1)"
            }
        }
        if (data.capture.true > 999) {
            color="rgba(135,206,250,1)"
        }
    } else {
        if (data.capture.false > 6) {
            color='rgba(165,42,42,1)'
        }
    }
    // background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 10%, rgba(0,212,255,1) 100%);}}
    return color;
};
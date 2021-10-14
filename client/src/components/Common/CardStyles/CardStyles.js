// This function will return a color for each data of an individual card that it receives. (using true, verified, and calculated values.)
export const CardStyles = (data) => {
    let color = `rgba(0,128,0,1)`;                  // default is green
    const percent = Math.floor(((Number(data.capture.true)-(Number(data.capture.false)))*100)/(Number(data.capture.true)))

    if (data.capture.verified ) {
        color = "rgba(65,105,225,1)"                // default verification color is blue
        if (data.capture.true > 99) {
            if (percent >= 40) {
                color="rgba(160,82,45,1)"           // bronze
            }
            if (percent >= 60) {
                color="rgba(192,192,192,1)"         // silver
            }
            if (percent >= 80) {
                color="rgba(218,165,32,1)"          // gold
            }
        }
        if (data.capture.true > 999 && percent >= 80) {
            color="rgba(135,206,250,1)"             // diamond
        }
    } else {
        if (data.capture.false > 6) {
            color='rgba(165,42,42,1)'               // default non verified color is brown
        }
    }
    return color;
};
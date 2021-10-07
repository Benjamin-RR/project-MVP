import React, {useContext} from 'react';
import { CaptureContext } from '../../../CaptureContext';
import moment from 'moment';
import Midnight from './Styles/Midnight';
import Day from './Styles/Day';
import Rise from './Styles/Rise';

// find time, find style dependable upon that time (dawn, day, dusk, night) OR if dynamic style is turned on.
export const getMapStyle = () => {
    const { dynamicMapStyle } = useContext(CaptureContext);

    const Time = moment().calendar()
    let mapStyle;
    if (dynamicMapStyle) {
        if ( Time.includes("P") && ((Time.split(":")[0]).split(" ")[2] < 6) || Time.includes("P") && ((Time.split(":")[0]).split(" ")[2] == 12) || Time.includes("A") && ((Time.split(":")[0]).split(" ")[2] > 6) && ((Time.split(":")[0]).split(" ")[2] != 12)) {
            mapStyle = Day;
        } else {
            mapStyle = Midnight;
        }
        if (Time.split(":")[0].includes("6")) {
            mapStyle = Rise;
        }
    } else {
        mapStyle = Day;
    }
    return mapStyle
}
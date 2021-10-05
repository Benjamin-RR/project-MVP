import { LoadCapture } from "../../Utilities/LoadCapture";
import { LoadNames } from "../../Utilities/LoadNames";

// gets captures for map, centered on coords given.
// unused value 'position' will be used in a future update when mongoDB gets too large, query results will prioritize based off of position.
export const getCapturesForMap = async (position) => {

    // ATTEMPT MINUS ONE
    const one = async () => {
        return await LoadNames();
    }
    const two = async (names) => {
        return await LoadCapture(names);
    }
    const first = await one();
    console.log("first:" , first);
    const second = await two({first});
    console.log("second:" , second);
    return second;


    // ATTEMPT ZERO
    // const answer = await LoadCapture(LoadNames());
    // console.log("answer in fetch:" , answer);
    // return answer;


    // ATTEMPT ONE
    // const names = await LoadNames();
    // console.log("names in map fetch:" , names)

    // const two = await LoadCapture(names);
    // console.log("names in fetch2:" , two);

    // return two;


    // ATTEMPT TWO
    // LoadNames()
    //     .then((data) => {
    //         console.log("in fetch:" , data);
    //         LoadCapture(data)
    //         .then((data) => {})
    //         console.log("in fetch2:" , data);
    //     })
    //     .then((data) => {
    //         return data;
    //     })

    // ATTEMPT THREE
    // LoadNames()
    //     .then((data) => {
    //         console.log("in fetch:" , data);
    //         LoadCapture(data)
    //         .then((data) => {

    //             console.log("in fetch2:" , data);
    //             return data;
    //         })
    //     })


    // return LoadCapture(LoadNames());
}
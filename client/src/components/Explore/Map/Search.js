import React, {useState, useContext, useEffect} from 'react';
import { CaptureContext } from '../../CaptureContext';
import styled from 'styled-components';
// icons
import {BiSearch} from 'react-icons/bi';
import {FcSearch} from 'react-icons/fc';
import {RiCheckboxCircleLine} from 'react-icons/ri';
import {RiCheckboxCircleFill} from 'react-icons/ri';

const Search = () => {
    const {
        page,
        setPage,
        userID,
        myLocation,
        setMyLocation,
        dynamicMapStyle,
        setDynamicMapStyle,
        currentCapture, 
        setCurrentCapture,
        searchSize, 
        setSearchSize,
        searchQuery,
        setSearchQuery,
        mapDataLoading, 
        setMapDataLoading,
        captureArray, 
        setCaptureArray,
        // refreshPins, 
        // setRefreshPins,
    } = useContext(CaptureContext);
    const [searchActive, setSearchActive] = useState(false);                // for clicking on search icon.
    const [animalSearch, setAnimalSearch] = useState(searchQuery.animal);   // query of animal name being searched.
    const [userSearch, setUserSearch] = useState(searchQuery.user);         // query of user being searched.
    const [confirmTimer, setConfirmTimer] = useState(null);                 // after typing words, 2sec later the query is sent.

    // gets search size for map searches.
    const getSearchSize = () => {
        if (searchSize.width === "45px") {
            setSearchSize({width: "200px", height: "190px"});
        } else {
            setSearchSize({width: "45px", height: "45px"});
        }
    }

    // on load of this component should always be this size.
    useEffect(()=>{
        setSearchSize({width: "45px", height: "45px"})
    },[])

    // we will not send our search query until user has stopped typing for 2 seconds.
    const startTimer = () => {
        clearTimeout(confirmTimer);
        const submitTimer = setTimeout( function() {sendSearchQuery(); }, 2000);
        setConfirmTimer(submitTimer);
    }
    // sends search query.
    const sendSearchQuery = () => {
        setMapToReload();
        setSearchQuery({...searchQuery, animal: animalSearch, user: userSearch});
    }

    // attempting to reset map for a reload of values.
    const setMapToReload = () => {
        setMapDataLoading(true);
        setCaptureArray(null); 
        // setRefreshPins(true);
    }


    return(
        <Wrapper
            style={{width: `${searchSize.width}`, height: `${searchSize.height}`, cursor: "pointer"}}
        >

            <SideToSide>
                <Icon
                    onClick={()=>{
                        setSearchActive(!searchActive);
                        getSearchSize();
                    }}
                >
                    { searchActive ? (
                        <FcSearch
                            style={{height: "100%", width: "100%"}}
                        />
                    ):(
                        <BiSearch
                            style={{height: "100%", width: "100%"}}
                        />
                    )}
                </Icon>
                { searchActive && (
                    <SearchTitle>Filter Captures</SearchTitle>
                )}
            </SideToSide>

            { searchActive && (
                <SearchContent>

                    <SideToSide>
                        <Text>Certified</Text>
                        <Icon
                            onClick={()=> {
                                setSearchQuery({...searchQuery, certified: !searchQuery.certified})
                                setMapToReload();
                            }}
                        >
                            {searchQuery.certified ? (
                                <RiCheckboxCircleFill 
                                    style={{height: "100%", width: "100%" , color: "darkgreen"}}
                                />
                            ):(
                                <RiCheckboxCircleLine 
                                    style={{height: "100%", width: "100%"}}
                                />
                            )}
                        </Icon>
                    </SideToSide>
                    <SideToSide>
                        <Text>Uncertified</Text>
                        <Icon
                            onClick={()=> {
                                setSearchQuery({...searchQuery, unCertified: !searchQuery.unCertified})
                                setMapToReload();
                            }}
                        >
                            {searchQuery.unCertified ? (
                                <RiCheckboxCircleFill 
                                    style={{height: "100%", width: "100%" , color: "darkgreen"}}
                                />
                            ):(
                                <RiCheckboxCircleLine 
                                    style={{height: "100%", width: "100%"}}
                                />
                            )}
                        </Icon>
                    </SideToSide>

                        <Input
                            type="text"
                            placeholder="Animal"
                            value={animalSearch}
                            onChange={(e) => {
                                setAnimalSearch(e.target.value)
                                startTimer();
                            }}
                        />
                        <Input
                            type="text"
                            placeholder="User"
                            value={userSearch}
                            onChange={(e)=>{
                                setUserSearch(e.target.value)
                                startTimer();
                            }}
                        />
                        {/* <div
                            type="submit"
                        >submit</div> */}

                </SearchContent>
            )}

        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    height: 100%;
    width: 100%;
    z-index: 20;
    border: 1px solid black;
    padding: 5px;
    background: rgba(225, 225, 225, .7);
`
const SideToSide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const SearchTitle = styled.div`
    display: flex;
    align-items: center;
    /* width: 100%; */
    font-weight: 900;
    font-size: 1.2em;
    padding: 5px;
    border-bottom: 1px solid grey;
    /* border: 1px solid black; */
`

const Icon = styled.div`
    display: flex;
    align-items: center;
    height: 35px;
    width: 35px;
    
    /* border: 1px solid black; */
`

const SearchContent = styled.div`
    /* border: 1px solid black; */
    height: 100%;
    width: 100%;
    z-index: 21;
`

// const Column = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 5px 0px 5px 0px;
//     border: 1px solid black;
// `

const Text = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    margin-left: 5px;
    /* border: 1px solid black; */
`

const Input = styled.input`
    border: 1px solid black;
    width: 160px;
    /* width: 100%; */
    height: 30px;
    font-size: 1em;
    margin: 2px 0px 2px 0px;
    background: transparent;
`

export default Search;
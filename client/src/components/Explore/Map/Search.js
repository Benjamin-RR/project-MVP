import React, {useState} from 'react';
import styled from 'styled-components';
// icons
import {BiSearch} from 'react-icons/bi';
import {FcSearch} from 'react-icons/fc';
import {RiCheckboxCircleLine} from 'react-icons/ri';
import {RiCheckboxCircleFill} from 'react-icons/ri';

const Search = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState({certified: false, unCertified: false, animal: null, user: null})


    return(
        <Wrapper>

            <SideToSide>
                <Icon
                    onClick={()=>{
                        setSearchActive(!searchActive);
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
                        <Icon>
                            <RiCheckboxCircleLine 
                                style={{height: "100%", width: "100%"}}
                            />
                        </Icon>
                    </SideToSide>
                    <SideToSide>
                        <Text>Uncertified</Text>
                        <Icon>
                            <RiCheckboxCircleLine 
                                style={{height: "100%", width: "100%"}}
                            />
                        </Icon>
                    </SideToSide>

                        <Input
                            type="text"
                            placeholder="Animal"
                        />
                        <Input
                            type="text"
                            placeholder="User"
                        />

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
    border: 1px solid black;
`

const Icon = styled.div`
    display: flex;
    align-items: center;
    height: 35px;
    width: 35px;
    
    border: 1px solid black;
`

const SearchContent = styled.div`
    border: 1px solid black;
    height: 100%;
    width: 100%;
    z-index: 21;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 0px 5px 0px;
    border: 1px solid black;

`

const Text = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    border: 1px solid black;
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
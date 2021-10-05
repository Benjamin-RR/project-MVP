import React, {useState} from 'react';
import styled from 'styled-components';
import {BiSearch} from 'react-icons/bi';
import {FcSearch} from 'react-icons/fc';

const Search = () => {
    const [searchActive, setSearchActive] = useState(false);

    return(
        <Wrapper>
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
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 20;
    border: 1px solid black;
    padding-left: 5px;
`
const Icon = styled.div`
    display: flex;
    align-items: center;
    height: 35px;
    width: 35px;
    
    border: 1px solid black;
`

export default Search;
import React from "react";
import styled from "styled-components";
import Stat from "./Stat";

const Statistics = ({data}) => {

    console.log("data on statistics:" , data)

    return(
        <Wrapper>
            <Title>Statistics</Title>
            
            <Section>
                { data.author === localStorage.getItem("uniqueName") ? (
                    <SubTitle>Your Authentic Score</SubTitle>
                ):(
                    <SubTitle>{data.author}'s Authentic Score</SubTitle>
                )}
                <Content>
                    <Stat 
                        title="Total Captures"
                        num="27"
                        total="27"
                        style="bar"
                    />                
                </Content>
            </Section>

            <Section>
                { data.author === localStorage.getItem("uniqueName") ? (
                    <SubTitle>On Your Captures</SubTitle>
                ):(
                    <SubTitle>On {data.author}'s Captures</SubTitle>
                )}
                <Content>
                    <Stat 
                        title="Total Captures"
                        num="27"
                        total="27"
                        style="bar"
                    />
                </Content>
            </Section>

            <Section>
                <SubTitle>On Rating Others</SubTitle>
                <Content>
                    <Stat 
                        title="Total Captures"
                        num="27"
                        total="27"
                        style="bar"
                    />
                </Content>
            </Section>

        </Wrapper>
    )
}
    // ON YOUR CAPTURES
    // total: 0,
    // numOflocations: 0,
    // authenticScore: 0,
    // rank: 0,
    // numOfTrues: 0,
    // numOfFalses: 0,
    // numOfUncertains: 0,
    // numOfStars: 0,
    // documentations: 0,
    // types: 0,

    // MORE STATS
    // numOfRatingsGiven: 0, 
    // numFalsified: 0, 
    // numTruthified: 0, 
    // numIndecisive: 0, 
    // numOfStarsGiven: 0, 
    // numLoggedOn: 0, 
    // numMapSearches: 0, 
    // numMapUses: 0, 

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* height: 100%; */
    width: 100%;
    border: 1px solid black;
`

const Title = styled.div`
    font-size: 2em;
    font-weight: 900;
    padding-bottom: 10px;
`

const Section = styled.div`
    border: 1px solid black;
    margin: 5px;
    padding: 5px;
    width: 100%;
`

const SubTitle = styled.div`
    font-size: 1.2em;
    font-weight: 900;
    margin-bottom: 5px;
`

const Content = styled.div`

`


export default Statistics;
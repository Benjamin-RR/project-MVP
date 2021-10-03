import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Stat from "./Stat";
import Loader from '../../Common/Loader';

const Statistics = ({data}) => {

    console.log("statistics data:" , data)

    return(
        <Wrapper>
            { data ? (
                <>
                    { data.map((data, index) => {
                        return(
                            <>
                                <Title>Statistics</Title>
                                
                                <Section>
                                    { data.uniqueName === localStorage.getItem("uniqueName") ? (
                                        <SubTitle>Your Authentic Score</SubTitle>
                                    ):(
                                        <SubTitle>{data.uniqueName}'s Authentic Score</SubTitle>
                                    )}
                                    <Content>
                                        <Stat 
                                            num={data.captures.numOfTrues}
                                            total={(data.captures.numOfTrues)+(data.captures.numOfFalses)}
                                        />                
                                    </Content>
                                </Section>

                                <Section>
                                    { data.uniqueName === localStorage.getItem("uniqueName") ? (
                                        <SubTitle>On Your Captures</SubTitle>
                                    ):(
                                        <>
                                            <div></div>
                                            <SubTitle>On {data.uniqueName}'s Captures</SubTitle>
                                        </>
                                    )}
                                    <Content>
                                        <Stat 
                                            title="Total"
                                            num={data.captures.total}
                                            total={data.captures.total}
                                        />
                                        <Stat 
                                            title="Locations"
                                            num={data.captures.numOfLocations}
                                        />
                                        <Stat 
                                            title="Certified"
                                            num={data.captures.numOfTrues}
                                            total={(data.captures.numOfTrues)+(data.captures.numOfFalses)+(data.captures.numOfUncertains)}
                                        />
                                        <Stat 
                                            title="Refuted"
                                            num={data.captures.numOfFalses}
                                            total={(data.captures.numOfTrues)+(data.captures.numOfFalses)+(data.captures.numOfUncertains)}
                                            flip="true"
                                        />
                                        <Stat 
                                            title="Unclear Captures"
                                            num={data.captures.numOfUncertains}
                                            total={(data.captures.numOfTrues)+(data.captures.numOfFalses)+(data.captures.numOfUncertains)}
                                        />
                                        <Stat 
                                            title="Stars Received"
                                            num={data.captures.numOfStars}
                                            total={((data.captures.numOfTrues)+(data.captures.numOfFalses)+(data.captures.numOfUncertains))*5}
                                        />
                                        <Stat 
                                            title="Documentations"
                                            num={data.captures.documentations}
                                            total={data.captures.total}
                                        />
                                    </Content>
                                </Section>

                                <Section>
                                    <SubTitle>On Rating Others</SubTitle>
                                    <Content>
                                        <Stat 
                                            title="Ratings Given"
                                            num={data.moreStats.numOfRatingsGiven}
                                        />
                                        <Stat 
                                            title="Trues Given"
                                            num={data.moreStats.numTruthified}
                                            total={data.moreStats.numOfRatingsGiven}
                                        />
                                        <Stat 
                                            title="Falses Given"
                                            num={data.moreStats.numFalsified}
                                            total={data.moreStats.numOfRatingsGiven}
                                            flip="true"
                                        />
                                        <Stat 
                                            title="Uncertain Given"
                                            num={data.moreStats.numIndecisive}
                                            total={data.moreStats.numOfRatingsGiven}
                                        />
                                        <Stat 
                                            title="Stars Given"
                                            num={data.moreStats.numOfStarsGiven}
                                            total={(data.moreStats.numOfRatingsGiven)*5}
                                        />
                                    </Content>
                                </Section>

                                <Section>
                                    <SubTitle>App Usage</SubTitle>
                                    <Content>
                                        <Stat 
                                            title="Log ins"
                                            num={data.moreStats.numLoggedOn}
                                        />
                                        <Stat 
                                            title="Map Usages"
                                            num={data.moreStats.numMapUses}
                                        />
                                        <Stat 
                                            title="Map Searches"
                                            num={data.moreStats.numMapSearches}
                                            total={data.moreStats.numMapUses}
                                        />
                                        <Stat 
                                            title="Usage per hour"
                                            num={data.moreStats.avgHoursPerDay}
                                            total="24"
                                            flip="true"
                                        />
                                    </Content>
                                </Section>
                            </>
                        )
                    })}

                </>
            ):(
                <Loader />
            )}

        </Wrapper>
    )
}

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
    margin: 20px;
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
import React, {useContext, useEffect} from 'react';
import { CaptureContext } from '../../../CaptureContext';
import styled from 'styled-components';
// icons
import {BsToggleOn} from 'react-icons/bs';
import {BsToggleOff} from 'react-icons/bs';

const Settings = () => {
    const {
        setPage,
        badgeSetting, 
        setBadgeSetting,
        dynamicMapStyle,
        setDynamicMapStyle,
        dynamicBanner,
        setDynamicBanner,
        statsOnRatingOthers,
        setStatsOnRatingOthers,
    } = useContext(CaptureContext);

    useEffect(() => {
        setPage("settings");
    },[])

    return(
        <Wrapper>
            <SettingsContent>
                <Title>App Settings</Title>

                    <SubTitle>Feature</SubTitle>
                    <SideBySide>
                        <Column>
                            <Text>Badge Display Preference
                                <SubText>Toggle displaying badge overlay on verified captures.</SubText>
                            </Text>
                            <Text>Dynamic Map Style
                                <SubText>Map style renders according to time of day.</SubText>
                            </Text>
                            <Text>Dynamic Profile Banner
                                <SubText>When on, displays your most popular capture.</SubText>
                            </Text>
                            <Text>Rating Other's Statistics
                                <SubText>
                                    When on, profile statistics displays stats on how your rate other user's captures.
                                </SubText>
                            </Text>
                        </Column>
                        <Column>
                            {badgeSetting ? (
                                <Switch 
                                    onClick={() => {
                                        setBadgeSetting(!badgeSetting);
                                    }}
                                >
                                    <BsToggleOn 
                                        style={{ height: "100%", width: "100%", cursor: "pointer"}}
                                    />
                                </Switch>
                            ):(
                                <Switch 
                                    onClick={() => {
                                        setBadgeSetting(!badgeSetting);
                                    }}
                                >
                                    <BsToggleOff 
                                        style={{ height: "100%", width: "100%", cursor: "pointer", color: `var(--color-dark)`}}
                                    />
                                </Switch>
                            )}
                            
                            {dynamicMapStyle ? (
                                <Switch 
                                    onClick={() => {
                                        setDynamicMapStyle(!dynamicMapStyle);
                                    }}
                                >
                                    <BsToggleOn 
                                        style={{ height: "100%", width: "100%", cursor: "pointer"}}
                                    />
                                </Switch>
                            ):(
                                <Switch 
                                    onClick={() => {
                                        setDynamicMapStyle(!dynamicMapStyle);
                                    }}
                                >
                                    <BsToggleOff 
                                        style={{ height: "100%", width: "100%", cursor: "pointer", color: `var(--color-dark)`}}
                                    />
                                </Switch>
                            )}

                            {dynamicBanner ? (
                                <Switch 
                                    onClick={() => {
                                        setDynamicBanner(!dynamicBanner);
                                    }}
                                >
                                    <BsToggleOn 
                                        style={{ height: "100%", width: "100%", cursor: "pointer"}}
                                    />
                                </Switch>
                            ):(
                                <Switch 
                                    onClick={() => {
                                        setDynamicBanner(!dynamicBanner);
                                    }}
                                >
                                    <BsToggleOff 
                                        style={{ height: "100%", width: "100%", cursor: "pointer", color: `var(--color-dark)`}}
                                    />
                                </Switch>
                            )}

                            {statsOnRatingOthers ? (
                                <Switch 
                                    onClick={() => {
                                        setStatsOnRatingOthers(!statsOnRatingOthers);
                                    }}
                                >
                                    <BsToggleOn 
                                        style={{ height: "100%", width: "100%", cursor: "pointer"}}
                                    />
                                </Switch>
                            ):(
                                <Switch 
                                    onClick={() => {
                                        setStatsOnRatingOthers(!statsOnRatingOthers);
                                    }}
                                >
                                    <BsToggleOff 
                                        style={{ height: "100%", width: "100%", cursor: "pointer", color: `var(--color-dark)`}}
                                    />
                                </Switch>
                            )}
                        </Column>
                    </SideBySide>

            </SettingsContent>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--defaultHeight);
    width: 100%;
`

const SettingsContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    width: 100%;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 900;
    font-size: 1.5em;
    padding-top: 10px;
    color: white;
`

const SideBySide = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0px 15px 0px 15px;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
`

const SubTitle = styled.div`
    display: flex;
    margin-right: auto;
    margin-left: 25px;
    font-weight: 600;
    margin-top: 20px;
    padding: 5px;
    width: 70%;
    border-bottom: 1px solid white;
    color: white;
`

const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
    height: 60px;
    font-weight: 600;
    color: white;
`

const SubText = styled.div`
    margin-top: 5px;
    font-weight: 300;
    font-size: .8em;
    color: white;
`

const Switch = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    height: 70px;
    color: green;
`

export default Settings;
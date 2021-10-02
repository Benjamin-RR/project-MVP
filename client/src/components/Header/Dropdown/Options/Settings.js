import React, {useContext} from 'react'
import { CaptureContext } from '../../../CaptureContext'
import styled from 'styled-components';
// icons
import {BsToggleOn} from 'react-icons/bs';
import {BsToggleOff} from 'react-icons/bs';

const Settings = () => {
    const {
        page,
        setPage,
        dropdown,
        setDropdown,
        userID,
        setUserID,
        mediaQ,
        setMediaQ,
        uniqueName,
        setUniqueName,
        friendClick, 
        setFriendClick,
        badgeSetting, 
        setBadgeSetting,
        dynamicMapStyle,
        setDynamicMapStyle
    } = useContext(CaptureContext);
    setPage("settings");

    console.log("badge:", badgeSetting, "map style:" , dynamicMapStyle);

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
                                        style={{ height: "100%", width: "100%", cursor: "pointer", color: "darkgrey"}}
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
                                        style={{ height: "100%", width: "100%", cursor: "pointer", color: "darkgrey"}}
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
    /* justify-content: center; */
    align-items: center;
    height: 400px;
    width: 100%;
    border: 1px solid black;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 900;
    font-size: 1.5em;
`

const SideBySide = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0px 15px 0px 15px;
    /* border: 1px solid black; */
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    /* border: 1px solid black; */
`

const SubTitle = styled.div`
    display: flex;
    margin-right: auto;
    margin-left: 25px;
    font-weight: 600;
    margin-top: 20px;
    padding: 5px;
    width: 70%;
    border-bottom: 1px solid black;
`

const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
    height: 60px;
    font-weight: 600;
    /* border-top: 1px solid black; */
    /* border-bottom: 1px solid black; */
    /* border: 1px solid black; */
`

const SubText = styled.div`
    margin-top: 5px;
    font-weight: 300;
    font-size: .8em;
    /* border: 1px solid black; */
`

const Switch = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    height: 70px;
    /* border: 1px solid black; */
    color: green;
`

export default Settings;
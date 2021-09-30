import React, {useContext} from 'react'
import { CaptureContext } from '../../../CaptureContext'
import styled from 'styled-components';

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
        dynamicMapStyle,
        setDynamicMapStyle
    } = useContext(CaptureContext);
    setPage("settings");

    // handle all settings clicked.
    const handleSettingsClick = (value) => {
        if (value = "Dynamic Map") {

        }
    }

    return(
        <Wrapper>
            <SettingsContent>
                <Title>App Settings</Title>

                    <SubTitle>Feature</SubTitle>
                    <SideBySide>
                        <Column>
                            <Text>something</Text>
                            <Text>Dynamic Map Style
                                <SubText>Map style renders according to time of day.</SubText>
                            </Text>
                        </Column>
                        <Column>
                            <Input 
                                type="radio"
                                value="something"
                                onClick={() => handleSettingsClick(value)}
                                // visibility="none"
                            />
                            {/* <SubText /> */}
                            <Input 
                                type="radio"
                                value="Dynamic Map"
                                // checked={setDynamicMapStyle(!dynamicMapStyle)}
                                onClick={() => handleSettingsClick(value)}
                            />
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
    width: 300px;
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

const Input = styled.input`
    padding: 5px;
    height: 100%;
    /* border: 1px solid black; */

`

export default Settings;
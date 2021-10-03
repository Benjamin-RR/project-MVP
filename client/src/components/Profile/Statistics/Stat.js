import React from 'react';
import styled from 'styled-components';

// Stat function manipulates data to render things accordingly.
// title: displays a title if given one.
// num: used to display that num OR if total is present to display a %.
// total: used to display number as a percentage.
// flip: used to flip percentage (if flip is given). e.g. 20% would become 80%.
const Stat = ({title, num, total, style, type, flip}) => {

    // function gets % using 2 numbers. flip is used to flip the value of %. e.g. 30% to 70%.
    const getPercentage = (num, total, flip) => {
        if (flip) {
            return Math.floor(100-(num/total*100))
        } else {
            return Math.floor(num/total*100)
        }
    }
    // function determines a color based off of percentage given.
    const getColor = (percent) => {
        return `rgb(${(100 - percent) *2.56}, ${percent *2.56},0)`
    }

    return (
        <Wrapper>
            <Column>
                { title && (
                    <Title>{title}</Title>
                )}
                <SideToSide>
                    {(total && num > 0) ? (
                        <Number> {getPercentage(num, total)}% </Number>
                    ):(
                        <Number> {num} </Number>
                    )}
                    <BarBackground
                        style={{  }}
                    >
                        <BarForeground 
                            style={{ 
                                width: `${getPercentage(num, total)}%`,
                                background: `${getColor(getPercentage(num, total, flip))}`
                            }}
                        />
                    </BarBackground>
                </SideToSide>
            </Column>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 5px;
    margin: 10px 0px 10px 0px;
    border: 1px solid black;
    background: lightgrey;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const SideToSide = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-top: 10px;
`

const Number = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    padding: 5px;
`

const BarBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: darkgrey;
    height: 20px;
    width: 100%;
    margin: 5px;
    border: 1px solid black;
`
const BarForeground = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    position: relative;
    background: darkgrey;
    height: 20px;
    width: 100%;
    border: 1px solid black;
    margin-right: auto;
`

export default Stat;
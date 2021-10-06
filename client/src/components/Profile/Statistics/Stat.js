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
    background-color: #8d8d8d;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='152' height='152' viewBox='0 0 152 152'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='temple' fill='%23a5a5a5' fill-opacity='0.3'%3E%3Cpath d='M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");    
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
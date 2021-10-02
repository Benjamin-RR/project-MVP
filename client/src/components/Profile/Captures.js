import React from 'react';
import styled from 'styled-components';
import SingleCapture from '../Common/SingleCapture';
import Loading from '../Common/Loader';

const Captures = ({feed}) => {
    
    console.log("feed from captures:", feed)
    // const dataToGive = feed.data;
    // console.log("feed from captures:", dataToGive);
    

    return (
        <Wrapper>
            <div>Captures</div>
            {(feed) ? (feed.map((data, index) => {
                return(
                    <div
                    key={index}
                    >
                        <Card>
                            <SingleCapture
                                data={data}
                            />
                        </Card>
                        {/* <Rate
                            // onClick={() => {
                            //     localStorage.setItem("CaptureInfo", JSON.stringify(data) )
                            // }}
                            onClick={() => {
                                setCurrentCapture(data)
                            }}
                            to="/Rate"
                        >Rate</Rate> */}
                    </div>
                )
            })) : (
                <Loading />
            )
        }
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

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* height: 400px; */
    width: 320px;
    border: 1px solid black;
    /* padding: 5px; */
    margin: 5px;
    /* background: green; */
`

export default Captures;
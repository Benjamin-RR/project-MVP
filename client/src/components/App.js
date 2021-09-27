import React, {useContext} from 'react';
import { CaptureContext } from './CaptureContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Home from './Home';
import DM from './DM';
import Login from './Login';
import Register from './Login/Register';
import Profile from './Profile';
import Explore from './Explore';
import Gallery from './Explore/Camera/Gallery';
import Camera from './Explore/Camera/Camera';
import Upload from './Explore/Camera/Upload';
import Leaderboard from './Leaderboard';
import About from './About';
import Page404 from './Page404';
import Footer from './Footer';

const App = () => {
    const {
        userID,
    } = useContext(CaptureContext);
    
    return(
        <BrowserRouter>
            <GlobalStyles />
            <Header />

            <Main>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/Login">
                        <Login />
                    </Route>
                    <Route exact path="/Register">
                        <Register />
                    </Route>
                    <Route exact path="/DM">
                        <DM />
                    </Route>
                    <Route exact path="/Profile">
                        <Profile />
                    </Route>
                    <Route exact path="/Explore">
                        <Explore />
                    </Route>
                    <Route exact path="/Gallery">
                        <Gallery />
                    </Route>
                    <Route exact path="/Camera">
                        <Camera />
                    </Route>
                    <Route exact path="/Upload">
                        <Upload />
                    </Route>
                    <Route exact path="/Leaderboard">
                        <Leaderboard />
                    </Route>
                    <Route exact path="/About">
                        <About />
                    </Route>
                    <Route exact path="/404">
                        <Page404 />
                    </Route>
                </Switch>
            </Main>

            <Footer />
        </BrowserRouter>
    )
}

const Main = styled.div`

`

export default App;
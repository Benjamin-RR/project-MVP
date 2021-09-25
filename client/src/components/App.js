import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Home from './Home';
import DM from './DM';
import Login from './Login';
import Profile from './Profile';
import Explore from './Explore';
import Leaderboard from './Leaderboard';
import About from './About';
import Page404 from './Page404';
import Footer from './Footer';

const App = () => {
    return(
        <BrowserRouter>
            <GlobalStyles />
            <Header />

            <Main>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/DM">
                        <DM />
                    </Route>
                    <Route exact path="/Login">
                        <Login />
                    </Route>
                    <Route exact path="/Profile">
                        <Profile />
                    </Route>
                    <Route exact path="/Explore">
                        <Explore />
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
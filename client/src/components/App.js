import React, {useContext} from 'react';
import { CaptureContext } from './CaptureContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Home from './Home';
import DM from './DM';
import Login from './Login';
import Rate from './Features/Rate';
// import Register from './Login/Register';
import Profile from './Profile';
import Explore from './Explore';
import Gallery from './Explore/Camera/Gallery';
import Camera from './Explore/Camera/Camera';
import Upload from './Explore/Camera/Upload';
import Leaderboard from './Leaderboard';
import About from './About';
import Blog from './Features/Blog/Blog'
import Help from './Features/Help/Help'
import Terms from './Features/Terms/Terms'
import Contact from './Features/Contact/Contact'
import Page404 from './Page404';
import Footer from './Footer';
import Account from './Header/Dropdown/Options/Account'
import Friends from './Header/Dropdown/Options/Friends'
import Settings from './Header/Dropdown/Options/Settings'

const App = () => {
    // const {
    //     userID,
    // } = useContext(CaptureContext);
    
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
                    <Route exact path="/Rate">
                        <Rate />
                    </Route>
                    {/* <Route exact path="/Register">
                        <Register />
                    </Route> */}
                    <Route exact path="/DM">
                        <DM />
                    </Route>
                    <Route exact path="/Profile">
                        <Profile />
                    </Route>
                    <Route exact path="/Account">
                        <Account />
                    </Route>
                    <Route exact path="/Friends">
                        <Friends />
                    </Route>
                    <Route exact path="/Settings">
                        <Settings />
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
                    <Route exact path="/Blog">
                        <Blog />
                    </Route>
                    <Route exact path="/Help">
                        <Help />
                    </Route>
                    <Route exact path="/Terms">
                        <Terms />
                    </Route>
                    <Route exact path="/Contact">
                        <Contact />
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
    /* display: flex;
    height: 100vh;
    width: 100vw; */
`

export default App;
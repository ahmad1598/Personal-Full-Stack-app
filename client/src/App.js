import React, { Component } from 'react';
import Navbar from './components/Navbar.js'
import {withData} from './context/DataProvider.js'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './shared/ProtectedRoute.js'
import UserHome from './components/UserHome.js'
import Home from './components/Home.js'
import NotFound from './components/NotFound.js'
import Profile from './components/Profile.js'
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import EditProfile from './components/EditProfile.js';
import {pink, orange} from '@material-ui/core/colors'
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import Footer from './components/Footer.js';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
    light: '#2196f3', 
    main: '#455a64', //Main Color
    dark: '#1565c0',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ffd95b', //Yellow
    main: '#ffa726', // Yellow
    dark: '#c77800', //Brown
    contrastText: '#000',
  },
    openTitle: pink['700'],
    protectedTitle: orange['700'],
    type: 'light'
  }
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar {...this.props}/>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          {/* <PrivateRoute path="/user/edit/:userId" component={EditProfile} /> */}
          {/* <Route path="/user/:userId" component={Profile} /> */}
          <ProtectedRoute path={"/:_username/userhome"} redirectTo="/" component={UserHome} />
          <ProtectedRoute path={"/:_username/profile"} redirectTo="/" component={Profile} />
          <ProtectedRoute path={"/editprofile"} redirectTo="/" component={EditProfile} />
          {/* <ProtectedRoute path={`/${this.props.user.username}`} redirectTo="/" component={Profile} /> */}
          <ProtectedRoute path="*" redirectTo="/" component={NotFound} />
        </Switch>
        {!this.props.token && <Footer />}
      </MuiThemeProvider>
    )
  }
}

export default withData(App)

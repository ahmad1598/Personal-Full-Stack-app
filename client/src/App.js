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


class App extends Component {
  // constructor(props){
  //   super(props)
  // }
  render() {
    // console.log(this.props)
    return (
      <div>
        <Navbar {...this.props}/>
        {/* <Menu /> */}
        <Switch>
          <Route exact component={Home} path="/" />
          {/* <Route path="/users"  component={Users} /> */}
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
      </div>
    )
  }
}

export default withData(App)

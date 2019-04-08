import React from 'react'
import { Link, withRouter} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import red from '@material-ui/core/colors/red';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

  const isActive = (history, path) => {
    if (history.location.pathname == path)
      return {color: '#ffab00'}
    else
      return {color: '#ffffff'}
  }

const Navbar = withRouter((props) => {
    const {token, logout, user, classes} = props
    return (
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" type="title" color="inherit">
                    VS Social
                </Typography>

                {!token
                    ?
                        <span>
                            <Link to="/">
                                <IconButton aria-label="Home" style={isActive(props.history, "/")}>
                                    <HomeIcon />
                                </IconButton>
                            </Link>
                            {/* <Link to = "/" >HOME</Link> */}
                            <Link to = "/signup">
                                <Button style={isActive(props.history, "/signup")}>SIGN UP</Button>
                            </Link>

                            <Link to = "/login">
                                <Button style={isActive(props.history, "/login")}>LOGIN</Button>
                            </Link>
                        </span>
                    :
                        <>
                            <Link to = {`/${user.username}/userhome`} >
                                <IconButton aria-label="Home" style={isActive(props.history, `/${user.username}/userhome`)}>
                                    <HomeIcon/>
                                </IconButton>
                            </Link>
                            <Link to = {`/${user.username}/profile`}>
                                <Button style={isActive(props.history, `/${user.username}/profile`)}>MY PROFILE</Button>
                            </Link>
                            <Link to = "/" onClick={logout}>
                                <Button>LOGOUT</Button>
                            </Link>
                        </>
                    }

                {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
    
    )
        {/* <div className="container hoverable ">
            <div className="col s12">
                <nav className="nav-wrapper" >
                    
                    <div className="left" >
                    <a>VS Social</a>
                    </div>
                        <div className="right" >
                        {!token
                        ?
                            <>
                                <Link className="" to = "/" >HOME</Link>
                                <Link to = "/signup">SIGN UP</Link>
                                <Link to = "/login">LOGIN</Link>
                            </>
                        :
                            <>
                                <Link to = {`/${user.username}/userhome`} >HOME</Link>
                                <Link to = {`/${user.username}/profile`}>MY PROFILE</Link>
                                <Link to = "/" onClick={logout}>LOGOUT</Link>
                            </>
                        }
                        
                    </div>
                </nav>
            </div>
        </div> */}
    // )
})


export default withStyles(styles)(Navbar)
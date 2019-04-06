import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    const {token, logout, user} = props
    return (
        <div className="container hoverable ">
            <div className="col s12">
                <nav>
                    {/* <li className="brand-logo"></li> */}
                    <div className="nav-wrapper left" >
                        {/* {token && <Link className="" to = "/" >User Home</Link>} */}
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
        </div>
    )
}


export default Navbar
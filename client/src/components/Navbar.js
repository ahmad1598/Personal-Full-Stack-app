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
                        <Link className="" to = "/" >HOME</Link>
                        {!token
                        ?
                            <>
                                <Link to = "/signup">SIGN UP</Link>
                                <Link to = "/login">LOGIN</Link>
                            </>
                        :
                            <>
                                <Link to = {`/${user.username}/userhome`}>PROFILE</Link>
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
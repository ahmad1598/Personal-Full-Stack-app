import React from 'react'
import {withData} from '../context/DataProvider.js'
const Home = (props) => {
    return(
        (props.token)?
        <div className="HomeLogincontainer card">Home</div>
           :
        <div className="HomeLogoutcontainer card">Else</div>
    )
}
export default withData(Home)
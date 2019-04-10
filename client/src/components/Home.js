import React from 'react'
import {withData} from '../context/DataProvider.js'

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: 30,
    },
    card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing.unit * 5
    },
    title: {
      padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
      color: theme.palette.text.secondary
    },
    media: {
      minHeight: 330
    }
  })
  
const Home = (props) => {
    const {classes}  = props
    return(
        (!props.token) && 
          <div className="HomeLogoutcontainer">
            <p>I hope someday you will join us and the world will live as one</p> 
          </div>
    )
}
export default withData(Home)

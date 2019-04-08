import React from 'react'
import {withData} from '../context/DataProvider.js'
import {withStyles} from '@material-ui/core/styles'
import Card, {CardContent, CardMedia} from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'


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
    console.log('hi')
    return(
        (props.token)
        ?
        <div className="HomeLogincontainer card">Home</div>
           :
        <div className="HomeLogoutcontainer">
        <p>I hope someday you will join us and the world will live as one</p> 
        </div>
    )
}
export default withData(Home)


 {/* <div className="HomeLogoutcontainer card">Else</div> */}
        {/* <img src="https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60" alt=""/> */}
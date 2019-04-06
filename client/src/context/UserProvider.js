import React,{Component} from 'react'
// import axios from 'axios'
import {withRouter} from 'react-router-dom'
const UserContext = React.createContext()

// const dataAxios = axios.create()

class UserProvider extends Component{
    constructor(){
        super()
        this.state ={

        }
    }

     create = (user) => {
        return fetch('/api/users/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
          .then((response) => {
            return response.json()
          }).catch((err) => console.log(err))
      }
      
       list = () => {
        return fetch('/api/users/', {
          method: 'GET',
        }).then(response => {
          return response.json()
        }).catch((err) => console.log(err))
      }
      
       read = (params, credentials) => {
        return fetch('/api/users/' + params.userId, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
        }).then((response) => {
          return response.json()
        }).catch((err) => console.log(err))
      }
      
       update = (params, credentials, user) => {
        return fetch('/api/users/' + params.userId, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: user
        }).then((response) => {
          return response.json()
        }).catch((err) => {
          console.log(err)
        })
      }
      
       remove = (params, credentials) => {
        return fetch('/api/users/' + params.userId, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
        }).then((response) => {
          return response.json()
        }).catch((err) => console.log(err))
      }
      
       follow = (params, credentials, followId) => {
        return fetch('/api/users/follow/', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: JSON.stringify({userId:params.userId, followId: followId})
        }).then((response) => {
          return response.json()
        }).catch((err) => {
          console.log(err)
        })
      }
      
       unfollow = (params, credentials, unfollowId) => {
        return fetch('/api/users/unfollow/', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: JSON.stringify({userId:params.userId, unfollowId: unfollowId})
        }).then((response) => {
          return response.json()
        }).catch((err) => {
          console.log(err)
        })
      }
      
       findPeople = (params, credentials) => {
        return fetch('/api/users/findpeople/' + params.userId, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
        }).then((response) => {
          return response.json()
        }).catch((err) => console.log(err))
      }
      

      


    render(){
        return(
            <UserContext.Provider value={{
                create: this.create,
                list:this.list,
                read:this.read,
                update:this.update,
                remove:this.remove,
                follow:this.follow,
                unfollow:this.unfollow,
                findPeople:this.findPeople
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

}

export default withRouter(UserProvider)

export const withUser = C => props => (
    <UserContext.Consumer>
        {value => <C {...props}{...value} />}
    </UserContext.Consumer>
)
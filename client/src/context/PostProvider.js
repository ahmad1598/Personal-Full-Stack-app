import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
const PostContext = React.createContext()

const dataAxios = axios.create()

dataAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


class PostProvider extends Component {
    constructor(){
        super()
        this.state= {

        }
    }

     create = (params, credentials, post) => {
        return fetch('/api/posts/new/'+ params.userId, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: post
        }).then((response) => {
          return response.json()
        }).catch((err) => {
          console.log(err)
        })
      }
      
       listByUser = (params, credentials) => {
        return fetch('/api/posts/by/'+ params.userId, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
        }).then(response => {
          return response.json()
        }).catch((err) => console.log(err))
      }
      
       listNewsFeed = (params, credentials) => {
        return fetch('/api/posts/feed/'+ params.userId, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
        }).then(response => {
          return response.json()
        }).catch((err) => console.log(err))
      }
      
       remove = (params, credentials) => {
        return fetch('/api/posts/' + params.postId, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
        }).then((response) => {
          return response.json()
        }).catch((err) => {
          console.log(err)
        })
      }
      
       like = (params, credentials, postId) => {
        return fetch('/api/posts/like/', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: JSON.stringify({userId:params.userId, postId: postId})
        }).then((response) => {
          return response.json()
        }).catch((err) => {
          console.log(err)
        })
      }
      
       unlike = (params, credentials, postId) => {
        return fetch('/api/posts/unlike/', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: JSON.stringify({userId:params.userId, postId: postId})
        }).then((response) => {
          return response.json()
        }).catch((err) => {
          console.log(err)
        })
      }
      
       comment = (params, credentials, postId, comment) => {
        return fetch('/api/posts/comment/', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: JSON.stringify({userId:params.userId, postId: postId, comment: comment})
        }).then((response) => {
          return response.json()
        }).catch((err) => {
          console.log(err)
        })
      }
      
       uncomment = (params, credentials, postId, comment) => {
        return fetch('/api/posts/uncomment/', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          },
          body: JSON.stringify({userId:params.userId, postId: postId, comment: comment})
        }).then((response) => {
          return response.json()
        }).catch((err) => {
          console.log(err)
        })
      }
      
      

    render(){
        return(
            <PostContext.Provider value={{
                create: this.create,
                listByUser: this.listByUser,
                listNewsFeed: this.listNewsFeed,
                remove: this.remove,
                like: this.like,
                unlike:this.unlike,
                comment:this.comment,
                uncomment:this.uncomment
            }}>
                {this.props.children}
            </PostContext.Provider>
        )
    }
}


export default withRouter(PostProvider)

export const withPost = C => props => (
    <PostContext.Consumer>
        {value => <C {...props} {...value} />}
    </PostContext.Consumer>
)
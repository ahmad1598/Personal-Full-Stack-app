import React,{Component} from 'react'
import { withData } from '../context/DataProvider';
import { Tabs, Tab } from 'react-materialize';
import {Link} from 'react-router-dom'

class Profile extends Component {
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.getPosts()
        this.props.getFollowing()
        this.props.getFollower()
    }

    render(){

        return(
            <div className="profileContainer">
                <div className="ProfileForm">
                    <h4 className="card-title">User Profile</h4>
                    <img src={this.props.user.photo || "https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"} alt=""/>
                    <h4>{ this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1) }</h4>
                    
                    <div className="profileButtons">
                            <a href="#" className="btn delete " onClick={() => this.props.deleteUser(this.props.user._id)}>Delete</a>
                            <Link className="btn edit " to={`/editprofile`}>Edit</Link>
                    </div>
                    <hr/>
                        <p>Joined: {(new Date(this.props.user.created)).toDateString()} </p>

                        <Tabs className="tab-demo z-depth-1">
                            <Tab title="Posts" active>
                                {this.props.posts.map(post => 
                                    <>
                                        <h5 key={post._id}>{post.text}</h5>
                                            <p>Posted At: {(new Date(post.created)).toDateString()} </p> 

                                            {/* <a href="#"      
                                                onClick={() => this.props.deletePost(post._id, post.text)}
                                                className="btn-floating btn-small pink accent-4">
                                                <i className="material-icons">delete</i>
                                            </a> */}

                                            {/* <a href="#" 
                                        
                                                onClick={
                                                    <Link></Link>
                                                }
                                                className="btn-floating btn-small blue darken-3">
                                                <i className="material-icons">edit</i>
                                            </a> */}
                        </>
                    )}

                            </Tab>

                            <Tab title="Followers" >
                            <h4 className="card-title center">Followers</h4> 
                                
                                {this.props.followers.map(user => 
                                <div className="follow profileFollowing">
                                    <img src={user.photo || "https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"} />
                                    <h6>{user.username}</h6>
                                </div>
                                )}
                            </Tab>
                            <Tab title="Following">
                                <h4 className="card-title center">Following</h4> 
                                {this.props.following.map(user => 
                                <div className="follow profileFollowing">
                                    <img src={user.photo || "https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"} />
                                    <h6>{user.username}</h6>
                                    <button className="btn white black-text" onClick={() => this.props.unFollowUser(user._id)}>Unfollow</button> 
                                </div>
                                )}
                            </Tab>
                        </Tabs> 
                </div>
            </div>
        )
    }
}

export default withData(Profile)

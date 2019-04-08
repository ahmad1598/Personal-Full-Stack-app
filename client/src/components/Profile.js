import React,{Component} from 'react'
import { withData } from '../context/DataProvider';
import { Tabs, Tab } from 'react-materialize';
import {Link} from 'react-router-dom'
// import EditProfile from './EditProfile';
class Profile extends Component {
    constructor(){
        super()
        this.state= {

        }
    }
    componentDidMount(){
        this.props.getPosts()
        this.props.following(this.props)
    }

    render(){
        console.log(this.props)
        return(
            <div className="ProfileForm card">
                <h4 className="card-title">User Profile</h4>
                <img src={this.props.user.photo || "https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"} alt=""/>
                <h4>{this.props.user.username}</h4>
                
                   <div className="profileButtons">
                        <a href="#" className="btn pink accent-4">Delete </a>
                        <Link className="btn blue darken-3" to={`/editprofile`}>Edit</Link>
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
                            Followers
                        </Tab>
                        <Tab title="Following">
                            Following
                        </Tab>
                    </Tabs> 
            </div>
        )
    }
}

export default withData(Profile)


// {this.props.user.following.map(follower => 
//     <>
//         <div className="follow">
//             <img src={"https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"} alt=""/>
//             {/* <h6>{follower.username}</h6> */}
//                                         {/* FIX ME - Add clickable functionality to Follow Button */}
//             <button className="btn blue" onClick={() => this.props.followUser(follower._id)}>UnFollow</button> 
//         </div>
//     </>
// )} 
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
    }

    render(){
        // console.log(this.props)
        return(
            <div className="ProfileForm card">
                <h6 className="card-title">Profile</h6>
                
                <img src="https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg" alt=""/>
                <h6>{this.props.user.username}</h6>
                
                    <a href="#"         
                        className="btn-floating btn-small pink accent-4">
                        <i className="material-icons">delete</i>
                    </a>

                    <Link className="btn-floating btn-small blue darken-3" to={`/editprofile`}><i className="material-icons">edit</i></Link>
                    
                <hr/>
                    <p>Joined: {(new Date(this.props.user.created)).toDateString()} </p>

                    <Tabs className="tab-demo z-depth-1">
                        <Tab title="Posts">
                            {this.props.posts.map(post => 
                                <>
                                    <h4 key={post._id}>{post.text}</h4>
                                    
                                        <span>Posted At: {(new Date(post.created)).toDateString()} </span> 

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
                        <Tab title="Followers" active>
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

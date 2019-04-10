import React, {Component} from 'react'
import PropTypes from 'prop-types'


class PostList extends Component {
  constructor(){
    super()
    this.state={
      text:""
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addPost(this.state)

    this.setState({
      text:""
    })
  }

  render() {
    return (
      <div style={{marginTop: '24px'}}>
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Post Title"/>
      </form>

        {/* {this.props.posts.map((item, i) => {
            
          })
        } */}
      </div>
    )
  }
}
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
export default withUser(PostList)

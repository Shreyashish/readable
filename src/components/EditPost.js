import React, {Component} from 'react'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {editFormBodyPost, editFormTitlePost} from '../actions'
import {editPost} from '../utils/api'

class EditPost extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.post.length !== nextProps.post.length) {
      this.props.dispatch(editFormTitlePost({title: nextProps.post[0] ? nextProps.post[0].title : "loading"}))
      this.props.dispatch(editFormBodyPost({body: nextProps.post[0] ? nextProps.post[0].body : "loading"}))
    }
  }

  handleEditPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    const postEdit = {
      title: values.title,
      body: values.body,
    }
    editPost(this.props.post[0].id, postEdit)
  }

  setEditBodyFormPost = (e) => {
    const body = e.target.value
    this.props.dispatch(editFormBodyPost({body}))
  }

  setEditTitleFormPost = (e) => {
    const title = e.target.value
    this.props.dispatch(editFormTitlePost({title}))
  }

  render() {
    return (
      <div>
        <div>
          <p>
            Edit Post
          </p>
          <form onSubmit={this.handleEditPost}>
            <div>
              <label>Title</label>
              <input name="title" type="text"
                     value={this.props.editFormTitlePost ? this.props.editFormTitlePost.title : "loading..."}
                     onChange={this.setEditTitleFormPost}/>
            </div>
            <div>
              <label>Post</label>
              <input name="body" type="text"
                        value={this.props.editFormBodyPost ? this.props.editFormBodyPost.body : "loading..."}
                        onChange={this.setEditBodyFormPost}/>
            </div>
            <button>
              Save
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({post, editFormBodyPost, editFormTitlePost}, ownProps) {
  return {
    post: post.filter(post => post.id === ownProps.postId),
    editFormBodyPost,
    editFormTitlePost
  }
}

export default connect(mapStateToProps)(EditPost);

import React, {Component} from 'react'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {editFormBodyComment} from '../actions'
import {editComment} from '../utils/api'
import {receiveSingleComment_wrapper} from '../utils/thunk'

class EditPost extends Component {

  componentDidMount() {
    this.props.dispatch(receiveSingleComment_wrapper(this.props.commentId))
  }

  handleEditComment = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    const commentEdit = {
      timeStamp: Date.now(),
      body: values.comment,
    }
    editComment(this.props.commentId, commentEdit)
  }

  setEditBodyFormComment = (e) => {
    const body = e.target.value
    this.props.dispatch(editFormBodyComment({body}))
  }

  render() {
    const {comment} = this.props

    return (
      <div>
        <div>
          <p>
            Edit Comment
          </p>
          <form onSubmit={this.handleEditComment}>
            <div>
              <label>Comment</label>
              <textarea type="text" name="comment" value={comment.body} onChange={this.setEditBodyFormComment}>
              </textarea>
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

function mapStateToProps({singleComment}, ownProps) {

  return {
    comment: singleComment,
    commentId: ownProps.commentId
  }
}

export default connect(mapStateToProps)(EditPost);

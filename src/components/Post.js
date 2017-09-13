import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import {
  fetchComments, upVotePost_wrapper, downVotePost_wrapper, deletePost_wrapper, postComment, upVoteComment_wrapper,
  downVoteComment_wrapper, deleteComment_wrapper
} from '../utils/thunk'
import {sortByUpVoteComments, sortByDownVoteComments, sortByIncTimeComments, sortByDecTimeComments} from '../actions'
import {Link, withRouter} from 'react-router-dom'

class Post extends Component {

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.postId))
  }

  handleUpVotePost = (id) => {
    this.props.dispatch(upVotePost_wrapper(id))
  }

  handleDownVotePost = (id) => {
    this.props.dispatch(downVotePost_wrapper(id))
  }

  handleDeletePost = (id) => {
    this.props.dispatch(deletePost_wrapper(id))
  }

  handleSubmitComment = (postId) => (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    const comment = {
      id: Math.random().toString(36).substr(-8),
      parentId: postId,
      timestamp: Date.now(),
      body: values.comment,
      author: values.author,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }
    this.props.dispatch(postComment(comment))
    e.target.comment.value = ""
    e.target.author.value = ""
  }

  handleUpVoteComment = (id, parentId) => {
    this.props.dispatch(upVoteComment_wrapper(id, parentId))
  }

  handleDownVoteComment = (id, parentId) => {
    this.props.dispatch(downVoteComment_wrapper(id, parentId))
  }

  handleDeleteComment = (id, parentId) => {
    this.props.dispatch(deleteComment_wrapper(id, parentId))
  }

  render() {
    const postId = this.props.postId

    return (
      <div>
        {this.props.post.map((post) => {
          if (post.id === postId) {
            if (!post.deleted) {
              return (
                <div key={post.id}>
                  <div>
                    <h1>{post.title}</h1>
                    <h3>
                      <div>
                        Category: {post.category}
                      </div>
                    </h3>
                    <hr/>
                    <p>
                      {post.author}
                      {(new Date(post.timestamp)).toLocaleString()}
                    </p>
                    <hr/>
                    <div>
                      <button type="button" onClick={() => this.handleUpVotePost(post.id)}>
                        UpVote
                      </button>
                      <button type="button" onClick={() => this.handleDownVotePost(post.id)}>
                        DownVote
                      </button>
                      <br/>
                      Score : {post.voteScore}
                      <br/>
                      <button type="button" onClick={() => this.handleDeletePost(post.id)}>
                        Delete
                      </button>
                      <Link to={`/editPost/${post.id}`} type="button">
                        <button type="button">Edit</button>
                      </Link>
                    </div>
                    <hr/>
                    <p>{post.body}</p>
                    <hr/>
                    <div>
                      <h4>Leave a Comment:</h4>
                      <form onSubmit={this.handleSubmitComment(postId)}>
                        <div>
                          <input type="text" name="author" placeholder="Author"/>
                        </div>
                        <div>
                          <textarea type="text" name="comment" placeholder="Add Comment"></textarea>
                        </div>
                        <button>Comment</button>
                      </form>
                    </div>
                  </div>
                  <div>
                    {this.props.comment[postId] && (
                      <div>
                        <h3>
                          Comments
                        </h3>
                        <div>
                          <ul>
                            <li>
                              <button type="button" onClick={() => this.props.dispatch(sortByUpVoteComments({parentId: post.id}))}>
                                UpVotes
                              </button>
                            </li>
                            <li>
                              <button type="button" onClick={() => this.props.dispatch(sortByDownVoteComments({parentId: post.id}))}>
                                DownVotes
                              </button>
                            </li>
                            <li>
                              <button type="button" onClick={() => this.props.dispatch(sortByIncTimeComments({parentId: post.id}))}>
                                Inc Time
                              </button>
                            </li>
                            <li>
                              <button type="button" onClick={() => this.props.dispatch(sortByDecTimeComments({parentId: post.id}))}>
                                Dec Time
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                    <hr/>
                    <div>
                      {this.props.comment[postId] && this.props.comment[postId].map((comment) => {
                        if (!comment.deleted) {
                          return (
                            <div key={comment.id}>
                              <div>
                                <h4>
                                  By: <strong>{comment.author}</strong>
                                  <p>At <strong>{(new Date(comment.timestamp)).toLocaleString()}</strong></p>
                                </h4>
                                <br/>
                                <p>{comment.body}</p>
                                <br/>
                                Vote Score : {comment.voteScore}
                                <br/>
                                <button type="button" onClick={() => this.handleUpVoteComment(comment.id, postId)}>
                                  UpVote
                                </button>
                                <button type="button" onClick={() => this.handleDownVoteComment(comment.id, postId)}>
                                  DownVote
                                </button>
                                <br/>
                                <button type="button" onClick={() => this.handleDeleteComment(comment.id, postId)}>
                                  Delete
                                </button>
                                <Link to={`/editComment/${comment.id}`}>
                                  <button type="button">
                                    Edit
                                  </button>
                                </Link>
                              </div>
                              <hr />
                            </div>
                          )
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <p>Post is Deleted!</p>
              )
            }
          }
          return null
        })}
      </div>
    )
  }
}

export default withRouter(Post)

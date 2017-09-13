import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
  upVotePost_wrapper,
  downVotePost_wrapper,
  deletePost_wrapper,
} from '../utils/thunk'
import {sortByUpVotePosts, sortByDownVotePosts, sortByIncTimePosts, sortByDecTimePosts} from '../actions'

class PostList extends Component {

  handleDeletePost = (id) => {
    this.props.dispatch(deletePost_wrapper(id))
  }

  handleUpVotePost = (id) => {
    this.props.dispatch(upVotePost_wrapper(id))
  }

  handleDownVotePost = (id) => {
    this.props.dispatch(downVotePost_wrapper(id))
  }

  render() {
    return (
      <div>
        <hr/>
        <ul>
          <li>
            <button type="button" onClick={() => this.props.dispatch(sortByUpVotePosts(this.props.posts))}>
              Sort by UpVotes
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.props.dispatch(sortByDownVotePosts(this.props.posts))}>
              Sort by DownVotes
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.props.dispatch(sortByIncTimePosts(this.props.posts))}>
              Sort by Inc Time
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.props.dispatch(sortByDecTimePosts(this.props.posts))}>
              Sort by Dec Time
            </button>
          </li>
        </ul>
        <hr/>
        <ul className="post">
          {this.props.posts.map((post) => {
            if (!post.deleted) {
              return (
                <div key={post.id}>
                  <li>
                    <h3>
                      <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                      <br/>
                      Score : {post.voteScore}
                    </h3>
                    <p>
                      By: <strong>{post.author}</strong>
                      <br/>
                      At: <strong>{(new Date(post.timestamp)).toLocaleString()}</strong>
                    </p>
                    <div>
                      <button type="button" onClick={() => this.handleUpVotePost(post.id)}>
                        UpVote
                      </button>
                      <button type="button" onClick={() => this.handleDownVotePost(post.id)}>
                        DownVote
                      </button>
                      <br/>
                      Comments: {this.props.comments.hasOwnProperty(post.id) ? this.props.comments[post.id].length : 0}
                      <br/>
                      <button type="button" onClick={() => this.handleDeletePost(post.id)}>
                        Delete
                      </button>
                      <Link to={`/editPost/${post.id}`}>
                        <button type="button">Edit</button>
                      </Link>
                    </div>
                  </li>
                  <hr/>
                </div>
              )
            } else {
              return null
            }
          })}
        </ul>
      </div>
    )
  }
}

export default PostList

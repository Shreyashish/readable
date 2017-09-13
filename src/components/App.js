import React, {Component} from 'react'
import {Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  fetchCategories,
  fetchPostsAndComments,
} from '../utils/thunk'
import Post from './Post'
import Nav from './Nav'
import Category from './Category'
import NewPost from './NewPost'
import EditPost from './EditPost'
import PostsCard from './PostsCard'
import EditComment from './EditComment'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPostsAndComments())
  }

  render() {
    return (
      <div>
        <Nav category={this.props.category}/>

        <Route exact path='/' render={() => (
          <PostsCard dispatch={this.props.dispatch} categories={this.props.category} posts={this.props.post} comments={this.props.comment}/>
        )}/>

        <Route path='/:category/posts' render={({match}) => (
          <Category categoryName={match.params.category}/>
        )}/>

        <Route path='/:category/:id' render={({match}) => (
          <Post dispatch={this.props.dispatch} postId={match.params.id} post={this.props.post} comment={this.props.comment}/>
        )}/>

        <Route path='/newPost' render={({match}) => (
          <NewPost dispatch={this.props.dispatch} categories={this.props.category}/>
        )}/>

        <Route path='/editPost/:id' render={({match}) => (
          <EditPost postId={match.params.id}/>
        )}/>

        <Route path='/editComment/:id' render={({match}) => (
          <EditComment commentId={match.params.id}/>
        )}/>
      </div>
    );
  }
}

function mapStateToProps({category, post, comment}) {

  return {
    category: Object.keys(category).map((name) => ({
      ...category[name]
    })),
    post,
    comment
  }
}

export default withRouter(connect(mapStateToProps)(App))



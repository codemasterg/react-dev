import React, { Component } from 'react';
import axios from 'axios'
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    // must load on update because Router path updates trigger an update
    componentDidUpdate() {
        this.loadPost();
    }
    componentDidMount() {
        this.loadPost();
    }

    loadPost() {
      
        // since state updates will cause this hook to be called and thus 
        // create an infinite loop, check if post not already loaded or if it 
        // is, ensure the post ID requested is not the same as the already obtained.
        if(this.props.match.params.id) {  // 'id' is path var set via Route component in Posts.js
            // must use != instead of !==  - loadPost.id is number, params.id is string!!!
            if(!this.state.loadedPost || this.state.loadedPost.id != this.props.match.params.id) {
                axios.get("https://jsonplaceholder.typicode.com/posts/" + this.props.match.params.id)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                    });
            }
        }
    }

    render () {
        let post = <p>Loading the selected Post ...</p>;
        if(this.props.match.params.id) {
            post = <p>Loading...</p>;
        }
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                            className="Delete"
                            onClick={() => {this.deletePostHandler(this.state.loadedPost.id)}}>
                            Delete
                        </button>
                    </div>
                </div>

            );
        }
        return post;
    }

    deletePostHandler = (id) => {
        axios.delete("https://jsonplaceholder.typicode.com/posts/" + this.match.params.id)
            .then(response => {
                this.setState({loadedPost: null});
            });
    }
}

export default FullPost;
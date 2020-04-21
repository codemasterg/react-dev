import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

/**
 * Example that uses axios to make REST calls.  Axios installed via:
 * sudo npm install axios --save
 */
class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false,
    }

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Greg',
                    }
                });
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            })
    }

    render () {
        let posts = null;
        if (this.state.error) {
            posts = <p>Something went wrong!</p>
        }
        else {
            posts = this.state.posts.map(post => (
            <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}/>
            ));
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }
}

export default Blog;
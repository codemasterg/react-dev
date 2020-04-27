import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import axios from 'axios';
import Posts from './Posts/Posts'
import './Blog.css';

import asyncNewComponent from '../../hoc/asyncComponent'

// Example of lazy loading of a component instead of just importing it
// via import NewPost from './NewPost/NewPost'.  NOTE, React 16.6 and higher
// provides React.lazy(() => import('./NewPost/NewPost')) so no need to 
// implement own hoc, but when component is rendered must use <Suspense > to wrap it.
// See folder routing--react-suspense-finished for a complete example.
const LazyLoadNewPost = asyncNewComponent(() => {
    return import('./NewPost/NewPost');  // dynamic import syntax
});

/**
 * Example that uses axios to make REST calls.  Axios installed via:
 *    sudo npm install axios --save
 * React routing packages installed via:
 *    sudo npm install --save react-router react-router-dom
 */
class Blog extends Component {

    render () {

        return (

            <div className="Blog">
                <header> 
                    <nav>
                        <ul>
                            {/* Note use of Link instead of <a> tag, read docs on Link.
                            This eliminates need to reload page.*/}
                            <li><NavLink exact to="/posts/">Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',  // always treated as absolute OR
                                //pathname: this.props.match.url + '/new-post', and must use withRouter hoc
                                hash: '#submit',  // dummy example of hash navigation
                                search: 'quick-submit=true'  // dummy example of query param for url
                            }
                            }>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* Same route element can be repeated but with diff component or render prop, e.g.
                  <Route path="/" exact = {true} render={() => <h1>Some Text</h1>} />
                  Note that routes are evaluated in the order listed. Using Switch however ensures
                  only the 1st matching route is selected, so order is very important. If
                  the 'exact' prop is not set, the /posts means ALL paths that begin with /posts */}
                <Switch>
                    <Route path="/new-post" component={LazyLoadNewPost} /> 
                    <Route path="/posts" component={Posts} />
                    {/* <Route path="/" component={Posts} /> */}
                    {/* OR */}
                    <Redirect exact from="/" to="/posts" />

                    {/* {/* should always come last, example of how to handle 404. */}
                    <Route render={() => <h2>Ooops, Page not found.</h2>} /> 
                </Switch>
            </div>
        );
    }
}

export default Blog;
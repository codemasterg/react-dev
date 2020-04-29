import React, { Component } from "react"
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

/**
 * Show preview of burger to be purchased
 */
class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }

    // Since Checkout is not a sub-component of any other component of App,
    // willMount is always called so this method can be used to perform the conversion
    // of search params to state ingredients.  WillMount is used instead of didMount to
    // ensure ingredients and total price are set as state vars before any rendering is done.
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);  // extracts query search params
        const ingredients = {};
        let totalPrice = 0;
        for(let params of query.entries()) {
            if (params[0] === 'totalPrice') {
                totalPrice = +params[1];
            }
            else {
                // ['salad', '1']
                ingredients[params[0]] = +params[1];  // '+' auto converts string to number
            }
        }
        console.log('ingredients: ' + ingredients);
        this.setState({ingredients: ingredients, totalPrice: totalPrice});
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelHandler={this.checkoutCancelHandler}
                    checkoutContinueHandler={this.checkoutContinueHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    // NOTE - see how you can pass props on a route component?!
                    render={() => (<ContactData 
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}/>)}/>
                
            </div>
        );
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();  // easy way to go back to previous page!
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');  // TBD
    }
}

export default Checkout
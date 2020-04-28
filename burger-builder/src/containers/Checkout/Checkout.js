import React, { Component } from "react"
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

/**
 * Show preview of burger to be purchased
 */
class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            cheese: 1,
            salad: 1,
            bacon: 1,
        }
    }

    // Since Checkout is not a sub-component of any other component of App,
    // didMount is always called so this method can be used to perform the conversion
    // of search params to state ingredients.
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);  // extracts query search params
        const ingredients = {};
        for(let params of query.entries()) {
            // ['salad', '1']
            ingredients[params[0]] = +params[1];  // '+' auto converts string to number
        }
        console.log('ingredients: ' + ingredients);
        this.setState({ingredients: ingredients});
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelHandler={this.checkoutCancelHandler}
                    checkoutContinueHandler={this.checkoutContinueHandler} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                
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
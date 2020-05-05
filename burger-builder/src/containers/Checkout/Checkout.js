import React, { Component } from "react"
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

/**
 * Show preview of burger to be purchased
 */
class Checkout extends Component {
    
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancelHandler={this.checkoutCancelHandler}
                    checkoutContinueHandler={this.checkoutContinueHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    // NOTE - see how you can pass props on a route component?!
                    render={(props) => (<ContactData 
                        ingredients={this.props.ings}
                        totalPrice={this.props.totalPrice}
                        {...props} />)}/>
                
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

// subset of state to pass to connect that this component is interested in.  In this
// example, prop "ings" is mapped to state "ingredients" which was established in ingredientsReducer.js.
// ings will be passed as normal props to BurgerBuilder via connect().  "ingReducer" and 
// "priceReducer" are the prop names defined in index.js where the separate reducers
// are combined.
const mapStateToProps = (state) => {
    return {
        ings: state.ingReducer.ingredients,     // must use as named in the ingredientsReducer
        totalPrice: state.priceReducer.totalPrice,      // must use as named in priceReducer
    }
}

export default connect(mapStateToProps)(Checkout)
import React, {Component, Fragment} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'
import * as actionType from '../../store/actions/actionType'
import * as actions from '../../store/actions/index'

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: .7,
    cheese: .4,
    meat: 1.3,
}
class BurgerBuilder extends Component {

    state = {
        ingredientCount: 0,
        ordering: false,
        loading: false,
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    render() {

        // since ingredients are fetched from the DB, must present the spinner if
        // they are not yet available.
        let orderSummary = null;
        let burger = <Spinner />;
        if(this.props.ings) {
            burger = <Fragment>
                <Burger
                    ingredients={this.props.ings} />
                {/* controls to add / remove toppings */}
                <BuildControls
                    ingredientAdder={this.addIngredientHandler}
                    ingredientRemover={this.removeIngredientHandler}
                    prices={INGREDIENT_PRICES}
                    totalPrice={this.props.totalPrice}
                    // pass in ingredients counts to enable / disable remove button
                    ingredientCounts={this.props.ings}
                    purchasable={this.state.ingredientCount > 0}
                    ordered={this.orderHandler} />
            </Fragment>;

            orderSummary = <OrderSummary ingredients={this.props.ings}
                canceled={this.orderCancelHandler}
                ordered={this.orderContinueHandler}
                totalPrice={this.props.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />; 
        }

        return(
            <Fragment>
                <Modal show={this.state.ordering} modalClosed={this.orderCancelHandler}>
                    {orderSummary}     
                </Modal>
                {burger}
            </Fragment>
        );
    };

    addIngredientHandler = (type) => {

        this.props.onIngredientAdd(type);
        this.props.onPriceUpdate(INGREDIENT_PRICES[type]);
        this.setState({ingredientCount: this.state.ingredientCount + 1});
    }

    removeIngredientHandler = (type) => {
        
        if(this.state.ingredientCount <= 0) {
            this.setState({purchasable: this.purchasable(this.props.ings)});
            return;
        }

        this.props.onIngredientRemove(type);
        this.props.onPriceUpdate(-INGREDIENT_PRICES[type]);  // removing os use negated price
        this.setState({ingredientCount: this.state.ingredientCount - 1});
    }

    // click handler for order button.  note use of => function, anytime 'this' is needed
    // on execution.
    orderHandler = () => {
        this.setState({ordering: true})
    }

    orderCancelHandler = () => {
        this.setState({ordering: false})
    }

    /**
     * This handler is invoked if the user clicks 'Continue' from the OrderSummary,
     * it redirects (pushes) to a new route for /checkout which is mapped to the
     * Checkout in App.js.
     */
    orderContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
}

// subset of state to pass to connect that this component is interested in.  In this
// example, prop "ings" is mapped to state "ingredients" which was established in ingredientsReducer.js.
// ings will be passed as normal props to BurgerBuilder via connect().  "ingReducer" and 
// "priceReducer" are the prop names defined in index.js where the separate reducers
// are combined.
const mapStateToProps = (state) => {
    return {
        ings: state.ingReducer.ingredients,
        totalPrice: state.priceReducer.totalPrice,
        error: state.ingReducer.error
    }
}

/**
 * Establish a method property, 'onIngredientAdd' in this case that maps to
 * action of type 'ADD_INGREDIENT'.  onIngredientAdd can be used in the above component
 * and will be passed as normal props to BurgerBuilder via connect().
 * 
 * @param {*} dispatch reference to the redux dispatcher that is used to publish an 
 * event (action) 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        // exmamples of using action creator methods as well as an inline action example
        onIngredientAdd: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPriceUpdate: (updatedPrice) => dispatch({type: actionType.UPDATE_PRICE, price: updatedPrice}),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
    }
}
export default withErrorHandler(
    connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), 
    axios);
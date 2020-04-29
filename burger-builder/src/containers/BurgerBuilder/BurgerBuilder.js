import React, {Component, Fragment} from 'react';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: .7,
    cheese: .4,
    meat: 1.3,
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,  // base price is $4
        purchasable: false,
        ordering: false,
        loading: false,
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-my-burger-fc12a.firebaseio.com/ingredients.json')
            .then(resp => {
                this.setState({ingredients: resp.data})
            })
            .catch(error => {console.log(error)});
    }

    render() {

        // since ingredients are fetched from the DB, must present the spinner if
        // they are not yet available.
        let orderSummary = null;
        let burger = <Spinner />;
        if(this.state.ingredients) {
            burger = <Fragment>
                <Burger
                    ingredients={this.state.ingredients} />
                {/* controls to add / remove toppings */}
                <BuildControls
                    ingredientAdder={this.addIngredientHandler}
                    ingredientRemover={this.removeIngredientHandler}
                    prices={INGREDIENT_PRICES}
                    totalPrice={this.state.totalPrice}
                    // pass in ingredients counts to enable / disable remove button
                    ingredientCounts={this.state.ingredients}
                    purchasable={this.state.purchasable}
                    ordered={this.orderHandler} />
            </Fragment>;

            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                canceled={this.orderCancelHandler}
                ordered={this.orderContinueHandler}
                totalPrice={this.state.totalPrice} />;
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
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        // update total price
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice, 
            purchasable: this.purchasable(updatedIngredients)});
    }

    removeIngredientHandler = (type) => {
        
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            this.setState({purchasable: this.purchasable(this.state.ingredients)});
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        
        // update total price
        const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, 
            totalPrice: newTotalPrice, purchasable: this.purchasable(updatedIngredients)});
    }

    purchasable(updatedIngredients) {
        for(let count of Object.values(updatedIngredients)) {
            if (count > 0)
            {
                return true;
            }
        }
        return false;
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

        // encode ingredient counts as name value pairs for the url
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' 
                + encodeURIComponent(this.state.ingredients[i]));
        }

        // add total price
        queryParams.push('totalPrice=' + this.state.totalPrice);
        const queryString = queryParams.join('&');  // convert array of N/Vs to string for URL

        this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryString,    // e.g.: ?bacon=0&cheese=2&meat=1&salad=2
        });
    }

    checkoutHandler = () => {
        // alert("Ordered for " + this.state.totalPrice.toFixed(2));


    }
}

export default withErrorHandler(BurgerBuilder, axios);
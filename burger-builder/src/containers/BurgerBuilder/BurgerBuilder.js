import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: .7,
    cheese: .4,
    meat: 1.3,
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,  // base price is $4
        purchasable: false,
        ordering: false,
    }

    render() {

        return(
            <Fragment>
                <Modal show={this.state.ordering} modalClosed={this.orderCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                        canceled={this.orderCancelHandler}
                        ordered={this.orderContinueHandler}
                        totalPrice={this.state.totalPrice}/>
                </Modal>
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

    orderContinueHandler = () => {
        alert("Ordered for " + this.state.totalPrice.toFixed(2));
    }
}


export default BurgerBuilder;
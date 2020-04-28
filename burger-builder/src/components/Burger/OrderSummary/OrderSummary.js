import React, {Component, Fragment} from 'react'
import Button from '../../UI/Button/Button'


// implemented as a Component so componentDidUpdate() can be used
// to log update and demonstrate the performance optimization made
// by Modal.js.
class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('[OrderSummary] will update');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(key => {
                return (<li key={key}>
                    <span style={{ textTransform: 'capitalize' }}>{key}</span>: {this.props.ingredients[key]}
                </li>
                );
            });

        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A burger with fixins:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>
                    <strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong>
                </p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.canceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.ordered}>CONTINUE</Button>
            </Fragment>
        )
    }
}

export default OrderSummary;
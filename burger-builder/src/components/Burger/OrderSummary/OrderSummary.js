import React, {Fragment} from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return( <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
                </li>
            );
        });

    return(
        <Fragment>
            <h3>Your Order</h3>
            <p>A burger with fixins:</p>
            <ul>
                {ingredientSummary}
            </ul> 
            <p>
                <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
            </p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.canceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.ordered}>CONTINUE</Button>
            
        </Fragment>
    )
}

export default orderSummary;
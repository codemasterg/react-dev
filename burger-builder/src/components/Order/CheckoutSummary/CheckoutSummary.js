import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope you love it!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={null}>CANCEL</Button>
            <Button btnType="Success" clicked={null}>CONTINUE</Button>
        </div>

    );
}

export default checkoutSummary;
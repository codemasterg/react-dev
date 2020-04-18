import React, { Fragment } from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'


const buildControls = (props) => {
    return (
        <Fragment>
        <div className={classes.BuildControls}>
            {Object.entries(props.prices).map(item => (
                <BuildControl 
                    label={item[0]} 
                    price={item[1]}
                    key={item[0]}
                    ingredientAdder={() => props.ingredientAdder(item[0])}
                    ingredientRemover={() => props.ingredientRemover(item[0])}  
                    removerDisabled={props.ingredientCounts[item[0]] <= 0} />
            ))}
            <p>Total price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}> ORDER NOW</button>
        </div>
        </Fragment>
    )
}

export default buildControls;
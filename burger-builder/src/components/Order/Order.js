import React from 'react'
import classes from './Order.css'

const order = (props) => {

    const ingredients = [];

    // covert map to array of objects with a name and count field for display
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            count: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map(ing => {
        return (<span 
            style={{textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 5px',
            }}
            key={ing.name}> 
            {ing.name} ({ing.count})
            </span>)
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Total Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )

}

export default order;
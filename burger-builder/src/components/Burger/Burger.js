import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BugerIngredient';

const burger = (props) => {

    // Since ingredients is given as a map object, must:
    // - Transform each map item to its own array (because there can be more 
    //   than 1 cheese for example)
    // - The array is sized using the value from the map for an item, say cheese: 2.
    // - Each element in each array is mapped to an array of BurgerIngredient and 
    //   the ingredient is returned.
    // - Finally the separate arrays are reduced (flattened) to a single array. 
    let transformedIngedients = Object.keys(props.ingredients)
        .map( (igkey) => {
            return [...Array(props.ingredients[igkey])]
                .map((_, i) => {
                    return <BurgerIngredient key={igkey + i} type={igkey} />
                });
        })
        .reduce((arr, item) => {  // flatmap
            return arr.concat(item);
        },[]);  // the 2nd arg, an empty array is the initial value of 'arr'
        console.log(transformedIngedients);

    if (transformedIngedients.length === 0) {
        transformedIngedients = <p>Add what you like!</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngedients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;
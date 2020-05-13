import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import Spinner from '../UI/LoadingIndicator';
import ErrorModal from '../UI/ErrorModal';
function Ingredients() {

  // state is an array of ingredients
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  // for spinner
  const [error, setError] = useState();  // for error modal (dialog)

  // can have more than 1 useEffect() in a component function
  useEffect(() => {
    console.log('rendering ingredients', ingredients);
  }, [ingredients]);  // note 'ingredients' has been specified as a dependency (only run when this changes)

  const addIngredientHandler = (ingredient) => {

    // save to DB using built in fetch(), note addition of "ingredients.json" which is 
    // require by firebase as the root element to store things under.
    setIsLoading(true);
    fetch('https://react-hooks-update-9b3da.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        setIsLoading(false);
        return response.json();  // must convert response to json which is done via promise
      })
      .then(responseData => {  // process final promise using ID (name field) returned by DB
        setIngredients(prevIngredients => {
          return [...prevIngredients, { id: responseData.name, ...ingredient }]
        });
      });
  }

  const removeIngredientHandler = (id) => {
    // note back ticks (string interpolation) so dynamic params can be used in URL
    setIsLoading(true);
    fetch(`https://react-hooks-update-9b3da.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE',
      })
      .then(responseData => {  // filter is used because it produces a new copy of the array
        setIsLoading(false);
        setIngredients(prevIngredients => {
          return prevIngredients.filter((ingredient) => ingredient.id !== id);
        });
      })
      .catch((err) => {
        // React batches state updates so even though there are 2 state updates,
        // only 1 re-render results.
        setError(err.message);
        setIsLoading(false);
      });
  }

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {/* && is an alternative to ternary op that returns null if not true */}
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        {/* noted - Search fetchs previously stored ingredients on inital render
            so no need to repeat rest GET call in this function. */}
        <Search onLoadIngredients={setIngredients} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
